"use server";

import { AxiosError } from "axios";
import { PatientFormDataInterface } from "../components";
import { PatientInterface } from "../intefaces";
import { PatientService } from "../services";


// 📌 Server Action para crear un paciente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPatient(prevState: PatientFormDataInterface, formData: FormData) {

    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as PatientInterface;

    try {
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("guardando Paciente: ", data.name);
        const patient = await PatientService.createPatient(data);
        if (patient) return { ...prevState, fields: { ...patient } as PatientInterface, error: "", errors: {} };
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
