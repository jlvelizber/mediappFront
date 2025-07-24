import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAppointment, getAppointment, removeAppointment, updateAppointment, updateAppointmentStatus } from "../actions";
import { AppointmentFormDataInterface } from "../components";
import { AppointmentInterface, AppointmentStatusInterface } from "../intefaces";

export interface AppointmentStoreInterface {
    appointment: AppointmentInterface;
    mustUpdateList?: boolean; // Indica si se debe actualizar la lista de appointments
    isLoading: boolean;
    appointmenForAttendId: number | null;
    formManageAppointment: AppointmentFormDataInterface;
    setIsLoading: (isLoading: boolean) => void;
    addAppointment: (appointment: FormData) => Promise<number>;
    resetFormDataAppointment: () => void;
    getAppointmentForEdit: (id: number) => Promise<AppointmentFormDataInterface | null>;
    updateAppointment: (id: number, appointment: FormData) => Promise<number>;
    getAppointment: (id: number) => Promise<AppointmentInterface | null>;
    resetSlice: () => void;
    removeAppointment: (id: number) => Promise<boolean>;
    updateStateAppointment: (id: number, status: AppointmentStatusInterface, mustUpdateList?: boolean) => Promise<void>;
    attendAppointment: (id: number) => Promise<void>;
}


const formInitialState: AppointmentFormDataInterface = {
    fields: {
        id: undefined,
        patient_id: null,
        doctor_id: null,
        date_time: "",
        status: "pending",
        reason: ""
    },
    errors: {
        appointment_id: [],
        doctor_id: [],
        date: [],
        status: [],
        reason: []
    },
    error: "",

}
// Slice para el estado de appointments
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const createAppointmentSlice = (set: any, get: any): AppointmentStoreInterface => ({
    appointment: {
        id: undefined,
        patient_id: null,
        doctor_id: null,
        date_time: "",
        status: "pending",
        reason: ""
    },
    formManageAppointment: formInitialState,
    mustUpdateList: false, // Indica si se debe actualizar la lista de appointments
    // Estado de carga para las acciones
    isLoading: false,
    appointmenForAttendId: null,
    resetFormDataAppointment: () => {
        set({ formManageAppointment: { ...formInitialState } }, false, "app:appointment/resetFormData");
    },
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading }, false, "app:appointment/setIsLoading");
    },
    addAppointment: async (appointment: FormData) => {
        set({ isLoading: true }, false, "app:appointment/addAppointment");
        let appointmentId = 0;

        const response = await createAppointment({} as AppointmentFormDataInterface, appointment);
        set({ isLoading: false }, false, "app:appointment/addAppointment");
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("appointment" in response && response.success) {
                set({ appointment: response.appointment }, false, "app:appointment/addAppointment");
                appointmentId = (response.appointment as AppointmentInterface)?.id ?? 0; // Retorna el ID del appointment creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                set({ formManageAppointment: { ...response as AppointmentFormDataInterface } }, false, "app:appointment/errorAddAppointment");
            }
        }
        set({ isLoading: false }, false, "app:appointment/loadingAddAppointment");
        return appointmentId;
    },
    getAppointmentForEdit: async (id: number): Promise<AppointmentFormDataInterface | null> => {
        set({ formManageAppointment: { fields: {} } }, false, "app:appointment/getAppointmentForEdit");
        const appointment = await get().getAppointment(id);
        if (!appointment) return null;
        const formData = { ...formInitialState, fields: appointment };
        set({ formManageAppointment: formData }, false, "app:appointment/getAppointmentForEdit");
        return formData;
    },
    getAppointment: async (id: number): Promise<AppointmentInterface | null> => {
        // set({ isLoading: true }, false, "app:appointment/loadingGetappointment");
        const response = await getAppointment(id);
        // set({ isLoading: false }, false, "app:appointment/loadingGetappointment");
        if (!response) return null;
        return response;
    },
    updateAppointment: async (id: number, appointment: FormData): Promise<number> => {
        set({ isLoading: true }, false, "app:appointment/loadingUpdateAppointment");
        const response = await updateAppointment({} as AppointmentFormDataInterface, id, appointment);
        let appointmentId = 0;
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("appointment" in response && response.appointment) {
                set({ appointment: response.appointment }, false, "app:appointment/updateAppointment");
                await get().getAppointmentForEdit(id); // Actualiza el appointment en el estado para edicion
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                appointmentId = response.appointment?.id ?? 0; // Retorna el ID del appointment creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                if ("fields" in response) {
                    response.fields = { ...response.fields, id: id };
                }
                set({ formManageAppointment: { ...response as AppointmentFormDataInterface } }, false, "app:appointment/errorUpdateAppointment");
            }
        }
        set({ isLoading: false }, false, "app:appointment/loadingUpdateAppointment");
        return appointmentId;
    },
    removeAppointment: async (id: number): Promise<boolean> => {
        set({ isLoading: true }, false, "app:appointment/loadingRemoveAppointment");
        const response = await removeAppointment(id);
        set({ isLoading: false }, false, "app:appointment/loadingRemoveAppointment");
        if (!response) return false;
        return true;
    },
    resetSlice: () => {
        set({ appointment: { ...formInitialState } }, false, "app:appointment/resetSlice");
    },
    updateStateAppointment: async (id: number, status: AppointmentStatusInterface, mustUpdateList): Promise<void> => {
        set({ isLoading: true }, false, "app:appointment/loadingUpdateStateAppointment");
        try {
            const response = await updateAppointmentStatus(id, status);
            set({ appointment: response }, false, "app:appointment/updateStateAppointment");

        } catch (error: unknown) {
            // TODO: MAnagement of errors
            console.error("Error updating appointment status", error);

        } finally {
            if (mustUpdateList) set({ mustUpdateList: true }, false, "app:appointment/mustUpdateList");
            set({ isLoading: false }, false, "app:appointment/loadingUpdateStateAppointment");
        }
    },
    attendAppointment: async (id: number): Promise<void> => {
        // Implementa la lógica para atender una cita
        // set({ isLoading: true }, false, "app:appointment/attendAppointment");
        // Aquí podrías llamar a una acción para actualizar el estado de la cita a "completed"
        set({ appointmenForAttendId: id }, false, "app:appointment/attendAppointment");

    }
})


// Hook de Zustand con DevTools
export const useAppointmentStore = create<AppointmentStoreInterface>()(
    devtools(
        (set, get) => ({
            ...createAppointmentSlice(set, get), // Combina el slice con otros si es necesario
        }),
        { name: "AppointmentStore" } // Nombre que aparecerá en los devtools
    )
);