export function imageUrl(filename?: string) {
  if (!filename) return "";
  return `${import.meta.env.VITE_API_BASE_URL}/images/${filename}`;
}
