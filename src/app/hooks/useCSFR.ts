import axios from "axios";
import { useCallback } from "react";
import { getPublicApiUrl } from "@/lib/runtimePublicEnv";

export const useCSFR = () => {
  const getCSRFToken = useCallback(async () => {
    const apiUrl = getPublicApiUrl();
    const sanctumBase = apiUrl.replace(/\/api\/?$/i, "");
    await axios.get(`${sanctumBase}/sanctum/csrf-cookie`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
  }, []);

  return {
    getCSRFToken,
  };
};
