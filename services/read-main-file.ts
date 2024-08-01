import { bufferStream } from "@/utils/buffer-stream";
import { downloadFileStream } from "@/utils/download-file-stream";
import { redirect } from "next/navigation";

export async function readMainFile({
  searchFile,
  searchPkg,
}: {
  searchFile: string[];
  searchPkg: string;
}) {
  let pkg, scopedPkg;

  const isScopedPkg = searchPkg.startsWith("@");

  // Scoped packages need a special treatment :)
  if (isScopedPkg) {
    pkg = `${searchPkg}/${searchFile[0]}`;
    scopedPkg = `@${pkg.split("@")[1]}`;
  } else {
    pkg = searchPkg;
  }

  if (!pkg) return new Response('Missing "pkg" query param');

  let packageURL;

  // Pattern: https://registry.npmjs.org/cratebox/-/cratebox-2.1.0.tgz
  if (isScopedPkg) {
    packageURL = `https://registry.npmjs.org/${scopedPkg}`;
  } else {
    const [pkgName] = pkg.split("@");
    packageURL = `https://registry.npmjs.org/${pkgName}`;
  }

  const packageContents = await downloadFileStream(packageURL);

  const packageData = (await bufferStream(packageContents)).toString("utf-8");

  const pkgContent = JSON.parse(packageData);

  // console.log({ pkgContent });

  console.log("latest: ", pkgContent.versions[pkgContent["dist-tags"].latest]);

  const main = pkgContent.versions[pkgContent["dist-tags"].latest].main;
  const unpkg = pkgContent.versions[pkgContent["dist-tags"].latest].unpkg;
  const cratebox = pkgContent.versions[pkgContent["dist-tags"].latest].cratebox;

  if (cratebox) {
    return redirect(`/${pkg}@${pkgContent["dist-tags"].latest}/${cratebox}`);
  }

  if (unpkg) {
    return redirect(`/${pkg}@${pkgContent["dist-tags"].latest}/${unpkg}`);
  }

  return redirect(`/${pkg}@${pkgContent["dist-tags"].latest}/${main}`);
}
