import { AxiosResponse } from "axios";
import { DefaultMessageResourceRemoved } from "../intefaces";
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
    },


    /**
     * Update Appointment
     * @param id 
     * @param appointment 
     * @returns 
     */
    updateAppointment: async (id: number, appointment: AppointmentInterface): Promise<AppointmentInterface> => {
        const response = await apiClient.put(`${AppointmentService.route}/${id}`, appointment);
        return await response.data.data;
    },


    /**
       * Get Appointment by ID
       * @param id 
       * @returns 
       */
    getAppointment: async (id: string): Promise<AppointmentInterface> => {
        const response = await apiClient.get<AxiosResponse<AppointmentInterface>>(`${AppointmentService.route}/${id}`);
        const appointment: AppointmentInterface = response.data.data
        return appointment;
    },

    /**
     * Remove Appointment
     * @param id 
     * @returns 
     */
    removeAppointment: async (id: number): Promise<DefaultMessageResourceRemoved> => {
        const response = await apiClient.delete(`${AppointmentService.route}/${id}`);
        return await response.data;
    }
}