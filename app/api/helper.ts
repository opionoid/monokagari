/**
 * Next Fetchの第1引数にpathだけを入れたときvercel_urlを補うだけの薄いwrapper
 */
export function $fetch(url: RequestInfo | URL, init?: RequestInit | undefined) {
  if (typeof url === "string") {
  }
  const u =
    typeof url === "string"
      ? `${process.env.VERCEL_URL || "http://localhost:3415/"}${url}`
      : url;
  return fetch(u, init);
}
