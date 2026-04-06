import axios from "axios";
import { useCallback } from "react";

// Sanctum vive en el mismo origen que la API (Laravel), no en el dominio del frontend Next.
// NEXT_PUBLIC_API_URL suele terminar en /api; el cookie CSRF es /sanctum/csrf-cookie en la raiz del backend.
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
const SANCTUM_BASE = apiUrl.replace(/\/api\/?$/i, "");

export const useCSFR = () => {
    const getCSRFToken = useCallback(async () => {
        await axios.get(`${SANCTUM_BASE}/sanctum/csrf-cookie`, {
            withCredentials: true,
            headers:{
                "Content-Type": "application/json",
                credentials: "include",
            }
        });
    }, []);

    return {
        getCSRFToken
    }

};
