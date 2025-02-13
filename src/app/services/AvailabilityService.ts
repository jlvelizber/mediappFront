import { DoctorAvailabilityInterface } from "../intefaces";
import { apiClient } from "./api";


export const AvailabilityService = {

    getMyAvailability: async (): Promise<DoctorAvailabilityInterface[]> => {
        const response = await apiClient.get("/my-availabilities");
        const { data } = await response.data;
        return data;
    },


    saveAvailability: async (availability: DoctorAvailabilityInterface): Promise<DoctorAvailabilityInterface> => {
        const response = await apiClient.post(`/save-my-availability`, availability);
        const { data } = await response.data;
        return data;
    },

}