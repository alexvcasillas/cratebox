import https from "node:https";
import { Buffer } from "node:buffer";
import tar from "tar-stream";
import internal, { Readable } from "node:stream";
import gunzip from "gunzip-maybe";
import { bufferStream } from "./buffer-stream";

type Entry = {
  path: string;
  type: tar.Headers["type"];
  content: Buffer | null;
};

function downloadTarball(url: string): Promise<internal.Readable> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const chunks: Uint8Array[] = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const readable = new Readable();
          readable._read = () => {}; // _read is required but you can noop it
          readable.push(buffer);
          readable.push(null);
          resolve(readable);
        });
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

async function extractFileFromTarball(
  stream: internal.Readable,
  targetFileName: string
): Promise<Entry | null> {
  return new Promise((resolve, reject) => {
    let foundEntry: Entry | null = null;

    stream
      .pipe(gunzip())
      .pipe(tar.extract())
      .on("error", reject)
      .on("entry", async (header, stream, next) => {
        const entry: Entry = {
          // Most packages have header names that look like `package/index.js`
          // so we shorten that to just `/index.js` here. A few packages use a
          // prefix other than `package/`. e.g. the firebase package uses the
          // `firebase_npm/` prefix. So we just strip the first dir name.
          path: header.name.replace(/^[^/]+\/?/, "/"),
          type: header.type,
          content: null,
        };

        // Ignore non-files and files that don't match the name.
        if (entry.type !== "file" || entry.path !== `/${targetFileName}`) {
          stream.resume();
          stream.on("end", next);
          return;
        }

        try {
          entry.content = await bufferStream(stream);

          foundEntry = entry;

          next();
        } catch (error) {
          next(error);
        }
      })
      .on("finish", () => {
        resolve(foundEntry);
      });
  });
}

export async function getFileFromTarball(url: string, targetFileName: string) {
  const tarballStream = await downloadTarball(url);

  const fileBuffer = await extractFileFromTarball(
    tarballStream,
    targetFileName
  );

  return fileBuffer;
}
