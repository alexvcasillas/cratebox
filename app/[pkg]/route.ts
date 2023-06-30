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
  return await readMainFile({ searchPkg: params.pkg, searchFile: params.file });
}
