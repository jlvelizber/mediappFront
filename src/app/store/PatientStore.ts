/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPatient, getPatient, updatePatient } from "../actions";
import { PatientFormDataInterface } from "../components";
import { PatientInterface } from "../intefaces";

export interface PatientStoreInterface {
    patient: PatientInterface;
    isLoading: boolean;
    formManagePatient: PatientFormDataInterface;
    addPatient: (patient: FormData) => Promise<number>;
    getPatient: (id: number) => Promise<PatientInterface | null>;
    updatePatient: (id: number, patient: FormData) => Promise<number>;
    getPatientForEdit: (id: number) => Promise<PatientFormDataInterface | null>;
    resetFormDataPatient: () => void;
};

const initialState: PatientFormDataInterface = {
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

}

// Slice para el estado de pacientes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPatientSlice = (set: any, get: any) => ({
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
    addPatient: async (patient: FormData): Promise<number> => {
        set({ isLoading: true }, false, "app:patient/loadingAddPatient");
        const response = await createPatient({} as PatientFormDataInterface, patient);
        let patientId = 0;
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("patient" in response && response.success) {
                set({ patient: response.patient }, false, "app:patient/addPatient");
                patientId = response.patient?.id ?? 0; // Retorna el ID del paciente creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                set({ formManagePatient: { ...response as PatientFormDataInterface } }, false, "app:patient/errorAddPatient");
            }
        }
        set({ isLoading: false }, false, "app:patient/loadingAddPatient");
        return patientId;
    },

    getPatient: async (id: number): Promise<PatientInterface | null> => {
        set({ isLoading: true }, false, "app:patient/loadingGetPatient");
        const response = await getPatient(id);
        set({ isLoading: false }, false, "app:patient/loadingGetPatient");
        if (!response) return null;
        return response;
    },
    getPatientForEdit: async (id: number): Promise<void> => {
        set({ formManagePatient: { fields: {} } }, false, "app:patient/getPatientForEdit")
        const patient = await get().getPatient(id);
        set({ formManagePatient: { ...initialState, fields: patient } }, false, "app:patient/getPatientForEdit")
    },
    updatePatient: async (id: number, patient: FormData): Promise<number> => {
        set({ isLoading: true }, false, "app:patient/loadingUpdatePatient");
        const response = await updatePatient({} as PatientFormDataInterface, id, patient);
        let patientId = 0;
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("patient" in response && response.success) {
                set({ patient: response.patient }, false, "app:patient/updatePatient");
                patientId = response.patient?.id ?? 0; // Retorna el ID del paciente creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                if ("fields" in response) {
                    response.fields = { ...response.fields, id: id };
                }
                set({ formManagePatient: { ...response as PatientFormDataInterface } }, false, "app:patient/errorUpdatePatient");
            }
        }
        set({ isLoading: false }, false, "app:patient/loadingUpdatePatient");
        return patientId;
    },
    resetFormDataPatient: () => {
        set({ formManagePatient: { ...initialState } }, false, "app:patient/resetFormData")
    },
});


// Hook de Zustand con DevTools
export const usePatientStore = create<PatientStoreInterface>()(
    devtools(
        (set, get) => ({
            ...createPatientSlice(set, get), // Combina el slice con otros si es necesario
        }),
        { name: "PatientStore" } // Nombre que aparecerá en los devtools
    )
);