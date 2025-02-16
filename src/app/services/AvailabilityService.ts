import { DoctorAvailabilityInterface } from "../intefaces";
import { apiClient } from "./api";


export const AvailabilityService = {

    route: "/availabilities",

    getMyAvailability: async (): Promise<DoctorAvailabilityInterface[]> => {
        const response = await apiClient.get(`${AvailabilityService.route}`);
        const { data } = await response.data;
        return data;
    },


    saveMyAvailability: async (availability: DoctorAvailabilityInterface): Promise<DoctorAvailabilityInterface> => {
        const response = await apiClient.post(`${AvailabilityService.route}`, availability);
        const { data } = await response.data;
        return data;
    },

    removeAvailability: async (itemId: number): Promise<boolean> => {
        const response = await apiClient.delete(`${AvailabilityService.route}/${itemId}`);
        const { status } = response;
        if (status != 200) throw Error(`Error removing ${AvailabilityService.route}/${itemId}`)
        return true;
    }

}