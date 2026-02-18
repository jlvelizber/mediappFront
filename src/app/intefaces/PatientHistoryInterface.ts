import { AppointmentInterface } from "./AppointmentInterface";
import { MedicalRecordInterface } from "./MedicalRecordInterface";
import { PatientInterface } from "./PatientInterface";

export interface PatientHistoryInterface extends PatientInterface {
    appointments?: AppointmentWithMedicalRecord[];
}

export interface AppointmentWithMedicalRecord extends AppointmentInterface {
    medicalRecord?: MedicalRecordInterface;
    date?: string;
    time?: string;
    status_label?: string;
    duration_minutes?: number | string;
    has_prescription?: boolean;
}



