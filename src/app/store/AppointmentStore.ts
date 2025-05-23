import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAppointment } from "../actions";
import { AppointmentFormDataInterface } from "../components";
import { AppointmentInterface } from "../intefaces";

export interface AppointmentStoreInterface {
    appointment: AppointmentInterface;
    isLoading: boolean;
    formManageAppointment: AppointmentFormDataInterface;
    setIsLoading: (isLoading: boolean) => void;
    addAppointment: (appointment: FormData) => Promise<number>;
    resetFormDataAppointment: () => void;
    resetSlice: () => void;
}


const initialState: AppointmentFormDataInterface = {
    fields: {
        id: undefined,
        patient_id: null,
        doctor_id: null,
        date_time: new Date(),
        status: "pending",
        reason: ""
    },
    errors: {
        patient_id: [],
        doctor_id: [],
        date: [],
        status: [],
        reason: []
    },
    error: "",

}
// Slice para el estado de pacientes
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const createAppointmentSlice = (set: any, get: any): AppointmentStoreInterface => ({
    appointment: {
        id: undefined,
        patient_id: null,
        doctor_id: null,
        date_time: new Date(),
        status: "pending",
        reason: ""
    },
    formManageAppointment: initialState,
    resetFormDataAppointment: () => {
        set({ formManageAppointment: { ...initialState } }, false, "app:appointment/resetFormData");
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
                appointmentId = response.appointment?.id ?? 0; // Retorna el ID del paciente creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                set({ formManageAppointment: { ...response as AppointmentFormDataInterface } }, false, "app:patient/errorAddAppointment");
            }
        }
        set({ isLoading: false }, false, "app:patient/loadingAddAppointment");
        return appointmentId;
    },
    resetSlice: () => {
        set({ appointment: { ...initialState } }, false, "app:appointment/resetSlice");
    },
    isLoading: false
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