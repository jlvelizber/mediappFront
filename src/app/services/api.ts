import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ajusta según tu backend.

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchDoctors = async () => {
  const response = await apiClient.get("/doctors");
  return response.data;
};


export const fetchAppointments = async () => {
  const response = await apiClient.get("/appointments");
  return response.data;
};

export default apiClient;
