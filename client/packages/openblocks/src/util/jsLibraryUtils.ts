export function parseJSLibraryURL(url: string) {
  const match = url.match(/(?:npm\/|gh\/|unpkg\.com\/)([^@/]+)(?:@([^/]+))?/i);
  return {
    name: match?.[1] ?? url,
    version: match?.[2] ?? (match?.[1] ? "latest" : "unknown"),
  };
}

export async function fetchJSLibrary(url: string) {
  return fetch(url).then((res) => res.text());
}
