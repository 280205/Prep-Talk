// Centralized backend API URL helper for client and server
export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
}
