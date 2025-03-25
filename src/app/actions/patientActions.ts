"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PatientInterface } from "../intefaces";
import { PatientService } from "../services";


// 📌 Server Action para crear un paciente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPatient(prevState: any, formData: FormData) {
    const validations = {
        errors: {
            name: [] as string[],
            lastname: [] as string[],
            email: [] as string[],
            phone: [] as string[],
            address: [] as string[],
            dob: [] as string[],
            document: [] as string[],
            gender: [] as string[],
        },
        error: ""
    }

    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as PatientInterface;

    try {
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("guardando Paciente: ", data.name);

        const response = await PatientService.createPatient(data);

        console.log(response)

        // Actualizar la caché de Next.js y redirigir
        revalidatePath("/patients");
        redirect("/patients");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
        debugger
        const axiosError = error as AxiosError;
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        validations.error = "Error al guardar el paciente." + axiosError.response?.data?.message
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        validations.errors = axiosError.response?.data?.errors
        return validations;
    }
}
