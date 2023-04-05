export async function GET(_: Request) {
  return new Response("BAD REQUEST: missing [:file] in the URI", {
    status: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "plain/text; charset=utf-8",
      "Cache-Control": "public, max-age: 31536000, immutable",
    },
  });
}
