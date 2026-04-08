import axios from "axios";
import { getPublicApiUrl } from "@/lib/runtimePublicEnv";

const API_URL = getPublicApiUrl();

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 60_000,
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
