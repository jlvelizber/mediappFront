import axios from "axios";

const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_PUBLIC_URL; // Ajusta según tu backend.
export const useCSFR = () => {

    
    const getCSRFToken = async () => {
        await axios.get(PUBLIC_BACKEND_URL + "/sanctum/csrf-cookie", {
            withCredentials: true,
            headers:{
                "Content-Type": "application/json",
                credentials: "include",
            }
        });
    }

    return {
        getCSRFToken
    }

};
