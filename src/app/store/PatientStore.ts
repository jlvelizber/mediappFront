/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPatient } from "../actions";
import { PatientFormDataInterface } from "../components";
import { PatientInterface } from "../intefaces";

export interface PatientStoreInterface {
    patient: PatientInterface;
    messagePatientWasCreatedOrModified: string;
    isLoading: boolean;
    // campos formulario tiene campos y errores
    formManagePatient: PatientFormDataInterface;
    addPatient: (patient: FormData) => Promise<void>;
};


// Slice para el estado de pacientes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPatientSlice = (set: any) => ({
    patient: {
        document: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
    },
    formManagePatient: {
        fields: {
            id: undefined,
            name: "",
            lastname: undefined,
            email: "",
            phone: "",
            address: undefined,
            dob: undefined,
            document: "",
            gender: undefined,
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
    },
    messagePatientWasCreatedOrModified: "",
    addPatient: async (patient: FormData): Promise<void> => {
        set({ isLoading: true }, false, "app:patient/addPatient");
        const response = await createPatient({} as PatientFormDataInterface, patient);
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("patient" in response && response.success) {
                set({ patient: response.patient }, false, "app:patient/addPatient");
            } else {
                console.error("Unexpected response format", response);
                set({ formManagePatient: { ...response as PatientFormDataInterface } }, false, "app:patient/addPatient");
            }
            set({ isLoading: false }, false, "app:patient/addPatient");
        }
    },
});


// Hook de Zustand con DevTools
export const usePatientStore = create<PatientStoreInterface>()(
    devtools(
        (set) => ({
            ...createPatientSlice(set), // Combina el slice con otros si es necesario
        }),
        { name: "PatientStore" } // Nombre que aparecerá en los devtools
    )
);