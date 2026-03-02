import { apiClient } from "./api";

export interface DoctorProfileData {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    specialization: string;
}

export interface DoctorProfilePasswordPayload {
    current_password: string;
    password: string;
    password_confirmation: string;
}

const route = "/profile";

const getProfile = async (): Promise<DoctorProfileData> => {
    const response = await apiClient.get(route);
    return response.data.data;
};

const updateProfile = async (payload: Partial<DoctorProfileData>): Promise<DoctorProfileData> => {
    const response = await apiClient.put(route, payload);
    return response.data.data;
};

const updatePassword = async (payload: DoctorProfilePasswordPayload): Promise<string> => {
    const response = await apiClient.put(`${route}/password`, payload);
    return response.data?.message ?? "Contraseña actualizada correctamente.";
};

export const DoctorProfileService = {
    getProfile,
    updateProfile,
    updatePassword,
};
