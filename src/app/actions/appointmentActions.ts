import { AxiosError } from "axios";
import { AppointmentFormDataInterface } from "../components";
import { AppointmentInterface, DefaultMessageResourceRemoved } from "../intefaces";
import { AppointmentService } from "../services";
import { useAuthStore } from "../store";

export async function createAppointment(prevState: AppointmentFormDataInterface, formData: FormData): Promise<AppointmentFormDataInterface | { success: boolean; appointment: AppointmentInterface }> {
    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as AppointmentInterface;
    try {
        // get doctor_id from authStore
        const doctorId = useAuthStore.getState().doctor?.id;
        if (!doctorId) {
            throw new Error("Doctor ID no encontrado en el store");
        }
        data.doctor_id = doctorId;
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


export async function updateAppointment(prevState: AppointmentFormDataInterface, id: number, formData: FormData): Promise<AppointmentFormDataInterface | { success: boolean; appointment: AppointmentInterface }> {
    // Convertir FormData a un objeto
    const data = Object.fromEntries(formData.entries()) as unknown as AppointmentInterface;
    try {
        // get doctor_id from authStore
        const doctorId = useAuthStore.getState().doctor?.id;
        if (!doctorId) {
            throw new Error("Doctor ID no encontrado en el store");
        }
        data.doctor_id = doctorId;
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("actualizando Appointment: ", data.id);
        const appointment = await AppointmentService.updateAppointment(id, data);
        return { success: true, appointment };
    } catch (error: unknown) {
        prevState.fields = data;
        const axiosError = error as AxiosError;
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.error = "Error al actualizar la cita. " + axiosError.response?.data?.message
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.errors = axiosError.response?.data?.errors
        return prevState;
    }
}

// 📌 Server Action para obtener un appointment
export async function getAppointment(id: number): Promise<AppointmentInterface | null> {
    try {
        const appointment = await AppointmentService.getAppointment(id.toString());
        return appointment;
    } catch (error) {
        console.error("Error al obtener el appointment:", error);
        return null;
    }
}


export async function removeAppointment(id: number): Promise<DefaultMessageResourceRemoved | null> {
    try {
        const response: DefaultMessageResourceRemoved = await AppointmentService.removeAppointment(id);
        return response;
    } catch (error) {
        console.error("Error al eliminar el appointment:", error);
        return null;
    }
}