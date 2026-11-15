
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();

    const isAdminRequest =
      url.includes("/api/admin/") ||
      url.includes("/api/customers/all") ||
      url.includes("/api/customers/update/") ||
      url.includes("/api/customers/delete/") ||
      url.includes("/api/services/add") ||
      url.includes("/api/staff/add") ||
      url.includes("/api/staff/availability/") ||
      url.includes("/api/staff/update/") ||
      url.includes("/api/staff/delete/") ||
      url.includes("/api/appointments/update-status/") ||
      url.includes("/api/services/update/") ||
url.includes("/api/services/delete/") ||
url.includes("/api/reviews/all") ||
url.includes("/api/reviews/delete/") ||
      (url === "/api/appointments/" && method === "get");
      

    const token = localStorage.getItem(
      isAdminRequest ? "adminToken" : "customerToken"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
