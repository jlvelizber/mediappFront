import { MedicalRecordInterface, PatientInterface } from "@/app/intefaces";

export interface MedicalRecordFormInterface {
    initialData?: MedicalRecordFormDataInterface;
    deps?: {
        patient: PatientInterface
    };
    handleCancel: () => void;
    handleSubmit: (formData: FormData) => void;
}

export interface MedicalRecordFormDataInterface {
    fields: MedicalRecordInterface,
    errors: Record<string, string[]>,
    error: string
}