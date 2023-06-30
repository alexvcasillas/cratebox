import { getFileFromTarball } from "@/utils/get-file-from-tarball";
import { getMimeType } from "@/utils/get-mime-type";

export async function readPackageFile({
  searchFile,
  searchPkg,
}: {
  searchFile: string[];
  searchPkg: string;
}) {
  let file = searchFile,
    pkg,
    scopedPkg,
    filePath;

  const isScopedPkg = searchPkg.startsWith("@");

  // Scoped packages need a special treatment :)
  if (isScopedPkg) {
    pkg = `${searchPkg}/${searchFile[0]}`;
    scopedPkg = `@${pkg.split("@")[1]}`;
    // Define composed file path
    filePath = searchFile.slice(1).join("/");
  } else {
    pkg = searchPkg;
    // Define composed file path
    filePath = searchFile.join("/");
  }

  if (!pkg) return new Response('Missing "pkg" query param');
  if (!file) return new Response('Missing "file" query param');

  let tarballURL;

  // Pattern: https://registry.npmjs.org/cratebox/-/cratebox-2.1.0.tgz
  if (isScopedPkg) {
    const [pkgName, pkgVersion] = (pkg.split("/").pop() as string).split("@");
    tarballURL = `https://registry.npmjs.org/${scopedPkg}/-/${pkgName}-${pkgVersion}.tgz`;
  } else {
    const [pkgName, pkgVersion] = pkg.split("@");
    tarballURL = `https://registry.npmjs.org/${pkgName}/-/${pkgName}-${pkgVersion}.tgz`;
  }

  const mimeType = getMimeType(filePath);

  try {
    const entry = await getFileFromTarball(tarballURL, filePath);

    if (!entry || !entry.content)
      return new Response("NOT FOUND", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": `text/plain; charset=utf-8`,
          "Cache-Control": "public, max-age: 31536000, immutable",
        },
      });

    return new Response(entry.content.toString("utf8"), {
      status: 200,
      // @ts-ignore: Content-Length is a valid header
      headers: {
        "Content-Length": Buffer.byteLength(entry.content),
        "Access-Control-Allow-Origin": "*",
        "Content-Type": `${mimeType}`,
        "Cache-Control": "public, max-age: 31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    return new Response("ERROR", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": `text/plain; charset=utf-8`,
        "Cache-Control": "public, max-age: 31536000, immutable",
      },
    });
  }
}
