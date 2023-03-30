async function getPackage(pkg: string, file: string[]) {
  const composedPath = file.join("/");
  const req = await fetch(
    `http://localhost:3000/pkg?pkg=${pkg}&file=${composedPath}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "plain/text",
      },
    }
  );
  const res = await req.text();
  return res;
}

export default async function Package({ params }) {
  console.log(params);
  const pkg = await getPackage(params.pkg, params.file);

  return pkg;
}
