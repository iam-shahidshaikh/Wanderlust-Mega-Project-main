diff --git a/frontend/src/services/api.ts b/frontend/src/services/api.ts
new file mode 100644
index 0000000..9a1b5a7
--- /dev/null
+++ b/frontend/src/services/api.ts
@@ -0,0 +1,27 @@
+import axios from "axios";
+
+// Fallback origin: if NEXT_PUBLIC_API_URL is missing, use window.location.origin in browser
+// or http://localhost:3000 in server-side/dev.
+const DEFAULT_API_ORIGIN =
+  (typeof window !== "undefined" && window.location.origin) || "http://localhost:3000";
+
+const baseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_ORIGIN;
+
+console.log("[API] Using base URL:", baseUrl);
+
+const api = axios.create({
+  baseURL: baseUrl, // prevents "undefined/api/..." errors
+  timeout: 10000,
+  headers: {
+    "Content-Type": "application/json",
+  },
+});
+
+export default api;
+
+// Helper to build URLs safely if needed
+export function buildApiUrl(path: string) {
+  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
+}
+
