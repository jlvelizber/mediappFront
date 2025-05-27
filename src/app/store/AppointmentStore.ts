import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAppointment, getAppointment, updateAppointment } from "../actions";
import { AppointmentFormDataInterface } from "../components";
import { AppointmentInterface } from "../intefaces";

export interface AppointmentStoreInterface {
    appointment: AppointmentInterface;
    isLoading: boolean;
    formManageAppointment: AppointmentFormDataInterface;
    setIsLoading: (isLoading: boolean) => void;
    addAppointment: (appointment: FormData) => Promise<number>;
    resetFormDataAppointment: () => void;
    getAppointmentForEdit: (id: number) => Promise<AppointmentFormDataInterface | null>;
    updateAppointment: (id: number, appointment: FormData) => Promise<number>;
    getAppointment: (id: number) => Promise<AppointmentInterface | null>;
    resetSlice: () => void;
}


const initialState: AppointmentFormDataInterface = {
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
        const formData = { ...initialState, fields: appointment };
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
                // @ts-expect-error 
                appointmentId = response.appointment?.id ?? 0; // Retorna el ID del appointment creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                if ("fields" in response) {
                    response.fields = { ...response.fields, id: id };
                }
                set({ formManageappointment: { ...response as AppointmentFormDataInterface } }, false, "app:appointment/errorUpdateAppointment");
            }
        }
        set({ isLoading: false }, false, "app:appointment/loadingUpdateAppointment");
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