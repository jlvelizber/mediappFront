import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { MedicalRecordFormDataInterface } from "../components";
import { MedicalRecordInterface } from "../intefaces";

export interface MedicalRecordStoreInterface {
    medicalRecord: MedicalRecordInterface;
    isLoading: boolean;
    formManageMedicalRecord: MedicalRecordFormDataInterface;
    addMedicalRecord: (record: FormData) => Promise<number>;
    getMedicalRecord: (id: number) => Promise<MedicalRecordInterface | null>;
    resetSlice: () => void;
}

const initialState: MedicalRecordFormDataInterface = {
    fields: {
        id: undefined,
        appoint_id: null,
        cascade: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: ""
    },
    errors: {
        patient_id: [],
        doctor_id: [],
        diagnosis: [],
        treatment_plan: [],
        medications: [],
        next_visit: [],
    },
    error: "",
};


// Slice for the medical record state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMedicalRecordSlice = (set: any, get: any): MedicalRecordStoreInterface => ({
    medicalRecord: {
        id: undefined,
        appoint_id: null,
        cascade: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: ""
    },
    isLoading: false,
    formManageMedicalRecord: initialState,
    addMedicalRecord: async (record: FormData) => {
        // Implementation for adding a medical record
        return 1; // Placeholder return value
    },
    // 
    getMedicalRecord: async (id: number) => {
        // Implementation for fetching a medical record by ID
        return null; // Placeholder return value
    },
    resetSlice: () => {
        set({
            medicalRecord: initialState.fields,
            formManageMedicalRecord: initialState,
            isLoading: false,
        });
    },
});


// Hook de Zustand con DevTools
export const useMedicalRecordStore = create<MedicalRecordStoreInterface>()(
    devtools(
        (set, get) => ({
            ...createMedicalRecordSlice(set, get), // Combina el slice con otros si es necesario
        }),
        { name: "MedicalRecordStore", storage: createJSONStorage(() => localStorage) } // Nombre que aparecerá en los devtools
    )
);