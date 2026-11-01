import axios from "axios";

// Empty string = same origin (Vercel rewrites /api/* to the backend, and the
// Vite dev proxy does the same locally). Set VITE_API_URL only if the backend
// lives on a different domain, e.g. https://preppilot-api.onrender.com
const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || "").replace(/\/$/, ""),
    withCredentials: true,
})

export default api
