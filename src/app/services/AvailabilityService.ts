import { DoctorAvailabilityInterface } from "../intefaces";
import { apiClient } from "./api";


export const AvailabilityService = {

    getMyAvailability: async (): Promise<DoctorAvailabilityInterface[]> => {
        const response = await apiClient.get("/availabilities");
        const { data } = await response.data;
        return data;
    },


    saveAvailability: async (availability: DoctorAvailabilityInterface): Promise<DoctorAvailabilityInterface> => {
        const response = await apiClient.post(`/availabilities`, availability);
        const { data } = await response.data;
        return data;
    },

}