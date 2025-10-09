"use server";

import { AxiosError } from "axios";
import { PatientFormDataInterface } from "../components";
import { DefaultMessageResourceRemoved, PatientInterface } from "../intefaces";
import { PatientService } from "../services";


// 📌 Server Action para crear un paciente
export async function createPatient(prevState: PatientFormDataInterface, formData: FormData): Promise<PatientFormDataInterface | { success: boolean; patient: PatientInterface }> {
    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as PatientInterface;
    try {
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("guardando Paciente: ", data.name);
        // me da error
        //usePatientStore.set(state => state.setMessagePatientWasCreatedOrModified("Guardando paciente..."), false, "app:patient/messagePatientWasCreatedOrModified");
        const patient = await PatientService.createPatient(data);
        return { success: true, patient };

    } catch (error: unknown) {
        prevState.fields = data; // Mantener los datos ingresados en el formulario
        const axiosError = error as AxiosError;
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.error = "Error al guardar el paciente. " + axiosError.response?.data?.message
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.errors = axiosError.response?.data?.errors
        return prevState;
    }
}


// 📌 Server Action para obtener un paciente
export async function getPatient(id: number): Promise<PatientInterface | null> {
    try {
        const patient = await PatientService.getPatient(id.toString());
        return patient;
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        return null;
    }
}


export async function updatePatient(prevState: PatientFormDataInterface, id: number, formData: FormData): Promise<PatientFormDataInterface | { success: boolean; patient: PatientInterface }> {
    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as PatientInterface;
    try {
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("actualizando Paciente: ", data.name);
        const patient = await PatientService.updatePatient(id, data);
        return { success: true, patient };
    } catch (error: unknown) {
        prevState.fields = data;
        const axiosError = error as AxiosError;
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.error = "Error al guardar el paciente. " + axiosError.response?.data?.message
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.errors = axiosError.response?.data?.errors
        return prevState;
    }
}
/**
 * 
 * @param id 
 * @returns 
 */
export async function removePatient(id: number): Promise<DefaultMessageResourceRemoved | null> {
    try {
        const response: DefaultMessageResourceRemoved = await PatientService.removePatient(id);
        return response;
    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        return null;
    }
}

/**
 * 
 * @returns Promise<PatientInterface[]>
 */
export async function getPatientsByDoctorInSession(): Promise<PatientInterface[]> {
    try {
        const patients = await PatientService.getMyPatients();
        return patients;
    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        return [];
    }
}

/**
 * 
 * @param appointId 
 * @returns Promise<PatientInterface>
 */
export async function getPatientBasedOnAppointment(appointId: string): Promise<PatientInterface> {
    try {
        const patient = await PatientService.getPatientBasedOnAppointment(appointId);
        return patient;
    } catch (error) {
        console.error("Error al obtener el paciente basado en la cita:", error);
        throw error;
    }
}


export async function getPatientHistory(id: number): Promise<PatientInterface> {
    try {
        const patient = await PatientService.getPatientHistory(id);
        return patient;
    } catch (error) {
        console.error("Error al obtener el historial del paciente:", error);
        throw error;
    }
}



