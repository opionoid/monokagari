/**
 * Next Fetchの第1引数にpathだけを入れたときvercel_urlを補うだけの薄いwrapper
 */
export function $fetch(url: RequestInfo | URL, init?: RequestInit | undefined) {
  if (typeof url !== "string") {
    return fetch(url, init);
  }
  const u = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}${url}`
      :  `http://localhost:3415/${url}`
  return fetch(u, init);
}
