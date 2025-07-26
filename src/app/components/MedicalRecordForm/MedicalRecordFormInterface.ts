import { PatientInterface } from "@/app/intefaces";

export interface MedicalRecordFormInterface {
    initialData?: object;
    deps?: {
        patient: PatientInterface
    };
    handleCancel: () => void;
    handleSubmit: (formData: FormData) => void;
}