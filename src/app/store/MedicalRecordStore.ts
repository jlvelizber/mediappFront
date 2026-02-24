import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { createMedicalRecord, getMedicalRecordById } from "../actions/medicalRecordActions";
import { MedicalRecordFormDataInterface, PrescriptionItemError } from "../components";
import { MedicalRecordInterface } from "../intefaces";

export interface MedicalRecordStoreInterface {
    medicalRecord: MedicalRecordInterface;
    isLoading: boolean;
    formManageMedicalRecord: MedicalRecordFormDataInterface;
    addMedicalRecord: (record: FormData) => Promise<number>;
    getMedicalRecord: (id: number) => Promise<MedicalRecordInterface | null>;
    showMedicalRecod: (id: number) => Promise<MedicalRecordInterface | null>;
    showDetailMedicalRecord: (medicalRecordId: string) => Promise<MedicalRecordInterface | null>;
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    showMedicalRecod: async(id: number) : Promise<MedicalRecordInterface | null> => {
        return get().getMedicalRecord(id);
    },
    showDetailMedicalRecord: async (medicalRecordId: string): Promise<MedicalRecordInterface | null> => {
        const id = Number(medicalRecordId);
        if (!id) return null;
        const record = await getMedicalRecordById(id);
        if (!record) return null;
        set({
            medicalRecord: record,
            formManageMedicalRecord: {
                ...initialState,
                fields: {
                    id: record.id,
                    appointment_id: record.appointment_id,
                    symptoms: record.symptoms ?? "",
                    diagnosis: record.diagnosis ?? "",
                    treatment: record.treatment ?? "",
                    notes: record.notes ?? "",
                    prescription: record.prescription ?? {
                        appointment_id: record.appointment_id,
                        notes: "",
                        items: [],
                    },
                },
            },
        }, false, "app:medicalRecord/showDetailMedicalRecord");
        return record;
    },
    getMedicalRecord: async (id: number): Promise<MedicalRecordInterface | null> => {
        const record = await getMedicalRecordById(id);
        if (record) set({ medicalRecord: record }, false, "app:medicalRecord/getMedicalRecord");
        return record;
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