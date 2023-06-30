import path from "node:path";

import { readPackageFile } from "@/services/read-package-file";
import { readMainFile } from "@/services/read-main-file";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "force-cache";
export const runtime = "nodejs";
export const preferredRegion = "edge";

export async function GET(
  _: Request,
  { params }: { params: { file: string[]; pkg: string } }
) {
  const noExtension = path.extname(params.file[params.file.length - 1]) === "";

  if (noExtension) {
    return await readMainFile({
      searchFile: params.file,
      searchPkg: params.pkg,
    });
  }

  return await readPackageFile({
    searchPkg: params.pkg,
    searchFile: params.file,
  });
}
