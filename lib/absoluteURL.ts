export function baseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "https://etc.etc";
}

export function absoluteUrl(path: string): string {
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl()}${formattedPath}`;
}
