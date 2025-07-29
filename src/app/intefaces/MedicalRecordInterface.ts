
export interface MedicalRecordInterface {
    id?: number;
    appoint_id: number | null;
    cascade: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    notes: string;
}