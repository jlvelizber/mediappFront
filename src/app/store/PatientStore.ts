/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { createPatient, getPatient, getPatientBasedOnAppointment, getPatientHistory, getPatientsByDoctorInSession, removePatient, updatePatient } from "../actions";
import { PatientFormDataInterface } from "../components";
import { PatientInterface } from "../intefaces";

export interface PatientStoreInterface {
    patient: PatientInterface;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    formManagePatient: PatientFormDataInterface;
    addPatient: (patient: FormData) => Promise<number>;
    getPatient: (id: number) => Promise<PatientInterface | null>;
    updatePatient: (id: number, patient: FormData) => Promise<number>;
    getPatientForEdit: (id: number) => Promise<PatientFormDataInterface | null>;
    removePatient: (id: number) => Promise<boolean>;
    resetFormDataPatient: () => void;
    getPatientsByDoctorInSession: () => Promise<PatientInterface[]>;
    getPatientBasedOnAppointment: (appointId: string) => Promise<PatientInterface | null>;
    getPatientHistory: (id: number) => Promise<PatientInterface | null>;
    resetSlice: () => void;
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
export const createPatientSlice = (set: any, get: any): PatientStoreInterface => ({
    patient: {
        document: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
    },
    isLoading: false,
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
        if (!id) return null;
        set({ isLoading: true }, false, "app:patient/loadingGetPatient");
        const response = await getPatient(id);
        set({ isLoading: false }, false, "app:patient/loadingGetPatient");
        if (!response) return null;
        return response;
    },
    getPatientForEdit: async (id: number): Promise<PatientFormDataInterface | null> => {
        if (!id) return null;
        set({ formManagePatient: { fields: {} } }, false, "app:patient/getPatientForEdit");
        const patient = await get().getPatient(id);
        if (!patient) return null;
        const formData = { ...initialState, fields: patient };
        set({ formManagePatient: formData }, false, "app:patient/getPatientForEdit");
        return formData;
    },
    updatePatient: async (id: number, patient: FormData): Promise<number> => {
        if (!id) return 0;
        set({ isLoading: true }, false, "app:patient/loadingUpdatePatient");
        const response = await updatePatient({} as PatientFormDataInterface, id, patient);
        let patientId = 0;
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("patient" in response && response.success) {
                set({ patient: response.patient }, false, "app:patient/updatePatient");
                await get().getPatientForEdit(id); // Actualiza el paciente en el estado para edicion
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
    removePatient: async (id: number): Promise<boolean> => {
        set({ isLoading: true }, false, "app:patient/loadingRemovePatient");
        const response = await removePatient(id);
        set({ isLoading: false }, false, "app:patient/loadingRemovePatient");
        if (!response) return false;
        return true;
    },
    resetFormDataPatient: () => {
        set({ formManagePatient: { ...initialState } }, false, "app:patient/resetFormData");
    },

    getPatientsByDoctorInSession: async (): Promise<PatientInterface[]> => {
        const response = await getPatientsByDoctorInSession(); // Cambia esto por la función real para obtener pacientes por doctor
        if (!response) return [];
        return response;
    },
    getPatientBasedOnAppointment: async (appointId: string): Promise<PatientInterface | null> => {
        if (!appointId) return null;
        const patient = await getPatientBasedOnAppointment(appointId);
        if (!patient) return null;
        return patient;
    },
    getPatientHistory: async (id: number): Promise<PatientInterface | null> => {
        if (!id) return null;
        const patient = await getPatientHistory(id);
        if (!patient) return null;
        return patient;
    },
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading }, false, "app:patient/setIsLoading");
    },
    resetSlice: () => {
        set({
            patient: {
                document: "",
                name: "",
                lastname: "",
                email: "",
                phone: "",
                address: "",
            },
            formManagePatient: { ...initialState }
        }, false, "app:patient/resetSlice");
    }
});


// Hook de Zustand con DevTools
export const usePatientStore = create<PatientStoreInterface>()(
    devtools(
        (set, get) => ({
            ...createPatientSlice(set, get), // Combina el slice con otros si es necesario
        }),
        { name: "PatientStore", storage: createJSONStorage(() => localStorage) } // Nombre que aparecerá en los devtools
    )
);