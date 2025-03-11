import { AuthInterface } from "../intefaces";
import { apiClient } from "./api";




const login = async (email: string, password: string): Promise<AuthInterface> => {
    const responese = await apiClient.post("/auth/login", { email, password });
    return responese.data.data;

}


const logout = async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
}


const getMe = async () => {
    const response = await apiClient.get("/user");
    return response.data;
}

export const AuthService = {
    login,
    logout,
    getMe
}