import internal from "node:stream";

export function bufferStream(
  stream: internal.PassThrough | internal.Readable
): Promise<Buffer> {
  return new Promise((accept, reject) => {
    const chunks: any = [];

    stream
      .on("error", reject)
      .on("data", (chunk: any) => chunks.push(chunk))
      .on("end", () => accept(Buffer.concat(chunks)));
  });
}
