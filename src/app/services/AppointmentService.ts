import { AppointmentInterface, AppointmentPaginationInterface } from "../intefaces/AppointmentInterface";
import { apiClient } from "./api";

export const AppointmentService = {

    route: "/appointments",
    /**
     * List Appointments
     * @param pageRequest 
     * @param search 
     * @returns 
     */
    listMyAppointmentsByDoctor: async (pageRequest?: number, search?: string): Promise<AppointmentPaginationInterface> => {
        const page = pageRequest ? `?page=${pageRequest}` : "";
        const query = search ? `${page ? '&' : '?'}query=${search}` : "";
        const response = await apiClient.get(`${AppointmentService.route}/paginate${page}${query}`);
        return await response.data;
    },


    /**
     * Create Appointment
     * @param appointment 
     * @returns 
     */
    createAppointment: async (appointment: AppointmentInterface): Promise<AppointmentInterface> => {
        const response = await apiClient.post(`${AppointmentService.route}`, appointment);
        return await response.data.data;
    }
}