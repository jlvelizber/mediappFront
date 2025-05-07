import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AppointmentFormDataInterface } from "../components";
import { AppointmentInterface } from "../intefaces";

export interface AppointmentStoreInterface {
    appointment: AppointmentInterface;
    isLoading: boolean;
    formManageAppointment: AppointmentFormDataInterface;
    setIsLoading: (isLoading: boolean) => void;
}


const initialState: AppointmentFormDataInterface = {
    fields: {
        id: undefined,
        patient_id: null,
        doctor_id: null,
        date: "",
        start_time: "",
        end_time: "",
        status: "pending"
    },
    errors: {
        name: [],
        lastname: [],
        email: [],
        phone: [],
        address: [],
        dob: [],
        document: [],
        gender: [],
    },
    error: "",

}
// Slice para el estado de pacientes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAppointmentSlice = (set: any, get: any) => ({
    resetFormDataPatient: () => {
        set({ formManageAppointment: { ...initialState } }, false, "app:appointment/resetFormData")
    },
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading }, false, "app:appointment/setIsLoading")
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