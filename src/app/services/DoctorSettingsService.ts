import { apiClient } from "./api";

export interface DoctorSettingsData {
    default_appointment_duration: number;
    default_appointment_price: number;
    currency_default_appointment: string;
    currency_symbol_default_appointment: string;
    way_notify_appointment: "email" | "whatsapp" | "both";
    reminder_hour_appointment: number;
    medical_center_name: string;
    medical_center_address: string;
    medical_center_phone: string;
}

const route = "/doctor/settings";

const getSettings = async (): Promise<DoctorSettingsData> => {
    const response = await apiClient.get(route);
    return response.data.data;
};

const updateSettings = async (payload: Partial<DoctorSettingsData>): Promise<DoctorSettingsData> => {
    const response = await apiClient.put(route, payload);
    return response.data.data;
};

export const DoctorSettingsService = {
    getSettings,
    updateSettings,
};
