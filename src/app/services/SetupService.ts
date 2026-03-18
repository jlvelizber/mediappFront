import { apiClient } from "./api";

export interface SetupStatusResponse {
  data: {
    installed: boolean;
    defaults: {
      default_appointment_duration: number;
      default_appointment_price: number;
      default_appointment_currency: string;
      default_appointment_currency_symbol: string;
      notification_way: "email" | "whatsapp" | "both";
      reminder_hour_appointment: number;
    };
  };
}

export interface SetupInitializePayload {
  admin_name: string;
  admin_lastname: string;
  admin_email: string;
  admin_phone?: string;
  admin_password: string;
  admin_password_confirmation: string;
  doctor_specialization?: string;
  medical_center_name: string;
  medical_center_address?: string;
  medical_center_phone?: string;
  medical_center_email?: string;
  default_appointment_duration?: string;
  default_appointment_price?: string;
  default_appointment_currency?: string;
  default_appointment_currency_symbol?: string;
  notification_way?: "email" | "whatsapp" | "both";
  reminder_hour_appointment?: string;
}

const getStatus = async (): Promise<SetupStatusResponse> => {
  const response = await apiClient.get("/setup/status");
  return response.data;
};

const initialize = async (payload: SetupInitializePayload) => {
  const response = await apiClient.post("/setup/initialize", payload);
  return response.data;
};

export const SetupService = {
  getStatus,
  initialize,
};
