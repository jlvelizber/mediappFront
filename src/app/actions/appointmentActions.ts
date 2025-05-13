import { AxiosError } from "axios";
import { AppointmentFormDataInterface } from "../components";
import { AppointmentInterface } from "../intefaces";
import { AppointmentService } from "../services";

export async function createAppointment(prevState: AppointmentFormDataInterface, formData: FormData): Promise<AppointmentFormDataInterface | { success: boolean; appointment: AppointmentInterface }> {
    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as AppointmentInterface;
    try {
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("guardando Cita: ", data.reason);
        // me da error
        //usePatientStore.set(state => state.setMessagePatientWasCreatedOrModified("Guardando paciente..."), false, "app:patient/messagePatientWasCreatedOrModified");
        const appointment = await AppointmentService.createAppointment(data);
        return { success: true, appointment };

    } catch (error: unknown) {
        prevState.fields = data;
        const axiosError = error as AxiosError;
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.error = "Error al guardar la cita. " + axiosError.response?.data?.message
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.errors = axiosError.response?.data?.errors
        return prevState;
    }

}