import https from "node:https";
import { Buffer } from "node:buffer";
import tar from "tar-stream";
import internal, { Readable } from "node:stream";
import gunzip from "gunzip-maybe";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "force-cache";
export const runtime = "nodejs";
export const preferredRegion = "edge";

function bufferStream(stream: internal.PassThrough): Promise<Buffer> {
  return new Promise((accept, reject) => {
    const chunks: any = [];

    stream
      .on("error", reject)
      .on("data", (chunk: any) => chunks.push(chunk))
      .on("end", () => accept(Buffer.concat(chunks)));
  });
}

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

type Entry = {
  path: string;
  type: tar.Headers["type"];
  content: Buffer | null;
};

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

async function getFileFromTarball(url: string, targetFileName: string) {
  const tarballStream = await downloadTarball(url);

  const fileBuffer = await extractFileFromTarball(
    tarballStream,
    targetFileName
  );

  return fileBuffer;
}

export async function GET(request: Request) {
  const params = request.url.split("/");
  const file = params.pop();
  const folder = params.pop();
  const pkg = params.pop();

  console.log("request.url: ", request.url);
  console.log("file: ", file);
  console.log("folder: ", folder);
  console.log("pkg: ", pkg);

  if (!pkg) return new Response('Missing "pkg" query param');
  if (!file) return new Response('Missing "file" query param');

  const [pkgName, pkgVersion] = pkg.split("@");

  // Pattern: https://registry.npmjs.org/cratebox/-/cratebox-2.1.0.tgz
  const tarballURL = `https://registry.npmjs.org/${pkgName}/-/${pkgName}-${pkgVersion}.tgz`;

  try {
    const entry = await getFileFromTarball(tarballURL, `${folder}/${file}`);

    if (!entry || !entry.content) return new Response("NOT FOUND");

    return new Response(entry.content.toString("utf8"), {
      headers: {
        "Content-Type": "plain/text",
        "Cache-Control": "max-age: 31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    return new Response("ERROR");
  }
}