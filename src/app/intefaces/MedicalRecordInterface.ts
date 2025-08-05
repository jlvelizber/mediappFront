import { PrescriptionInterface } from "./PrescriptionInterface";

export interface MedicalRecordInterface {
    id?: number;
    appointment_id: number | null;
    cascade: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    prescription: PrescriptionInterface // Assuming prescriptions is an array of strings
}