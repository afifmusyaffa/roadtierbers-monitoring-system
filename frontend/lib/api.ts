/**
 * RoadTierbers Frontend API Helper
 * Use this instead of inline URL construction in every page.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Returns the full URL for a given API path.
 * Ensures consistent backend URL across all officer pages.
 */
export function apiUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
