import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { createMedicalRecord } from "../actions/medicalRecordActions";
import { MedicalRecordFormDataInterface, PrescriptionItemError } from "../components";
import { MedicalRecordInterface } from "../intefaces";

export interface MedicalRecordStoreInterface {
    medicalRecord: MedicalRecordInterface;
    isLoading: boolean;
    formManageMedicalRecord: MedicalRecordFormDataInterface;
    addMedicalRecord: (record: FormData) => Promise<number>;
    getMedicalRecord: (id: number) => Promise<MedicalRecordInterface | null>;
    setIsLoading: (loading: boolean) => void;
    resetSlice: () => void;
}

const initialState: MedicalRecordFormDataInterface = {
    fields: {
        id: undefined,
        appointment_id: null,
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        prescription: {
            appointment_id: null,
            notes: "",
            items: []
        } // Assuming you want to add prescriptions here
    },
    errors: {
        appointment_id: [] as string[],
        cascade: [] as string[],
        symptoms: [] as string[],
        diagnosis: [] as string[],
        treatment: [] as string[],
        notes: [] as string[],
        prescription: {
            notes: [] as string[],
            items: [] as PrescriptionItemError[]
        }

    },
    error: "",
};


// Slice for the medical record state
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const createMedicalRecordSlice = (set: any, get: any): MedicalRecordStoreInterface => ({
    medicalRecord: {
        id: undefined,
        appointment_id: null,
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        prescription: {
            appointment_id: null,
            notes: "",
            items: [],
        } // Assuming you want to add prescriptions here
    },
    isLoading: false,
    formManageMedicalRecord: initialState,
    addMedicalRecord: async (record: FormData): Promise<number> => {
        set({ isLoading: true }, false, "app:medicalRecord/loadingMedicalRecord");
        const response = await createMedicalRecord({} as MedicalRecordFormDataInterface, record);
        let medicalRecordId = 0;
        if (response) {
            // Verifica si el response tiene el formato esperado
            if ("medicalRecord" in response && response.success) {
                set({ medicalRecord: response.medicalRecord }, false, "app:medicalRecord/addMedicalRecord");
                medicalRecordId = response.medicalRecord?.id ?? 0; // Retorna el ID del paciente creado o 0 si es undefined
            } else {
                console.error("Unexpected response format", response);
                set({ formManageMedicalRecord: { ...response as MedicalRecordFormDataInterface } }, false, "app:patient/errorAddMedicalRecord");
            }
        }
        set({ isLoading: false }, false, "app:patient/loadingAddMedicalRecord");
        return medicalRecordId;
    },
    // 
    getMedicalRecord: async (id: number) => {
        console.log("Fetching medical record with ID:", id);
        // Implementation for fetching a medical record by ID
        return null; // Placeholder return value
    },
    setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },
    resetSlice: () => {
        set({
            medicalRecord: initialState.fields,
            formManageMedicalRecord: initialState,
            isLoading: false,
        });
    }
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