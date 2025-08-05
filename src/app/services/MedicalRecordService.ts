import { AxiosResponse } from "axios";
import { MedicalRecordInterface } from "../intefaces";
import { apiClient } from "./api";

export const MedicalRecordService = {
    route: "/medical-record",

    /**
     * Create a new medical record
     * @param data 
     * @returns 
     */
    saveMedicalRecord: async (data: MedicalRecordInterface): Promise<MedicalRecordInterface> => {
        const response = await apiClient.post<AxiosResponse<MedicalRecordInterface>>(`${MedicalRecordService.route}`, data);
        return response.data.data;
    },

    /**
     * Get a medical record by ID
     * @param id 
     * @returns 
     */
    getMedicalRecord: async (id: number): Promise<MedicalRecordInterface | null> => {
        try {
            const response = await apiClient.get(`${MedicalRecordService.route}/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching medical record:", error);
            return null;
        }
    },
}