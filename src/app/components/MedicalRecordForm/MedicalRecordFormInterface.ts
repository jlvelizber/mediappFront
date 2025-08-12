import { MedicalRecordInterface, PatientInterface } from "@/app/intefaces";

export interface MedicalRecordFormInterface {
    initialData?: MedicalRecordFormDataInterface;
    deps?: {
        patient: PatientInterface
    };
    handleCancel: () => void;
    handleSubmit: (formData: FormData) => void;
}

export interface PrescriptionItemError {
    medication_name?: string[];
    dosage?: string[];
    frequency?: string[];
    duration?: string[];
    notes?: string[];
}

export interface MedicalRecordFormDataInterface {
    fields: MedicalRecordInterface,
    errors: {
        appointment_id?: string[],
        cascade?: string[],
        symptoms?: string[],
        diagnosis?: string[],
        treatment?: string[],
        notes?: string[],
        prescription?: {
            notes?: string[],
            items?: PrescriptionItemError[]
        }
    },
    error: string
}