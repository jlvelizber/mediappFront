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
    }

}