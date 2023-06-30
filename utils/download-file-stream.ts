import https from "node:https";
import { Buffer } from "node:buffer";
import internal, { Readable } from "node:stream";

export function downloadFileStream(url: string): Promise<internal.Readable> {
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
