import axios from "axios";

// Fallback origin: if VITE_API_PATH is missing, use window.location.origin (browser)
// or http://localhost:3000 (dev/server-side).
const DEFAULT_API_ORIGIN =
  (typeof window !== "undefined" && window.location.origin) || "http://localhost:3000";

// ✅ Use Vite’s env system
const baseUrl = import.meta.env.VITE_API_PATH || DEFAULT_API_ORIGIN;

console.log("[API] Using base URL:", baseUrl);

const api = axios.create({
  baseURL: baseUrl, // prevents "undefined/api/..." errors
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Helper to build URLs safely if needed
export function buildApiUrl(path: string) {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
