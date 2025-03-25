import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ajusta según tu backend.

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    Accept: "application/json"
  },
  withCredentials: true,
  withXSRFToken: true,
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});