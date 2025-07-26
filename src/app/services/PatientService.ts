import { AxiosResponse } from "axios";
import { DefaultMessageResourceRemoved, PatientInterface, PatientPaginationInterface } from "../intefaces";
import { apiClient } from "./api";


export const PatientService = {

    route: "/patients",
    /**
     * List patients
     * @param pageRequest 
     * @param search 
     * @returns 
     */
    listMyPatients: async (pageRequest?: number, search?: string): Promise<PatientPaginationInterface> => {
        const page = pageRequest ? `?page=${pageRequest}` : "";
        const query = search ? `${page ? '&' : '?'}query=${search}` : "";
        const response = await apiClient.get(`${PatientService.route}/paginate${page}${query}`);
        return await response.data;
    },

    /**
     * List patients by doctor in session
     * @param pageRequest 
     * @param search 
     * @returns 
     */
    getMyPatients: async (): Promise<PatientInterface[]> => {
        const response = await apiClient.get(`${PatientService.route}`);
        return await response.data.data;
    },

    /**
     * Edit Patients
     * @param id 
     * @param data 
     * @returns 
     */
    editPatient: async (id: number, data: PatientInterface): Promise<PatientInterface> => {
        const response = await apiClient.put(`${PatientService.route}/${id}`, data);
        return await response.data;

    },

    /**
     * Create Patient
     * @param data 
     * @returns 
     */
    createPatient: async (data: PatientInterface): Promise<PatientInterface> => {
        const response = await apiClient.post<AxiosResponse<PatientInterface>>(`${PatientService.route}`, data);
        const patient: PatientInterface = response.data.data
        return patient;
    },

    /**
      * remove Patient
      * @param data 
      * @returns 
      */
    removePatient: async (id: number): Promise<DefaultMessageResourceRemoved> => {
        const response = await apiClient.delete(`${PatientService.route}/${id}`);
        return await response.data;
    },


    /**
     * Get Patient
     * @param id 
     * @returns 
     */
    getPatient: async (id: string): Promise<PatientInterface> => {
        const response = await apiClient.get<AxiosResponse<PatientInterface>>(`${PatientService.route}/${id}`);
        const patient: PatientInterface = response.data.data
        return patient;
    },


    /**
     * Update Patient
     */
    updatePatient: async (id: number, data: PatientInterface): Promise<PatientInterface> => {
        const response = await apiClient.put(`${PatientService.route}/${id}`, data);
        return await response.data;
    },


    /**
     * Get Patient by appointment
     * @param appointmentId
     */
    getPatientBasedOnAppointment: async (appointmentId: number): Promise<PatientInterface> => {
        const response = await apiClient.get<AxiosResponse<PatientInterface>>(`${PatientService.route}/appointment/${appointmentId}`);
        const patient: PatientInterface = response.data.data;
        return patient;
    }



}