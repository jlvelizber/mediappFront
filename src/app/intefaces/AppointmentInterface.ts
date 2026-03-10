import { PaginatorInterface } from "./PaginatorInterface";
import { PatientInterface } from "./PatientInterface";
import { MedicalRecordInterface } from "./MedicalRecordInterface";
import { PrescriptionInterface } from "./PrescriptionInterface";

export interface AppointmentInterface {
    id?: number,
    patient_id?: number | null,
    doctor_id?: number | null,
    date_time: string,
    status?: string,
    reason?: string,
    patient?: string | PatientInterface,
    date?: string,
    time?: string,
    duration_minutes?: number,
    medical_record?: MedicalRecordInterface,
    prescription?: PrescriptionInterface,
    created_at?: string,
    updated_at?: string
    status_label?: string,
}

export interface AppointmentListItemInterface {
    id: number,
    patient: string,
    date: string,
    time: string,
    status: string,
    status_label: string,
    duration_minutes: number,
    date_time: string,
    medical_record_id: number | null
}

export enum AppointmentStatusEnum {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export type AppointmentStatusInterface = `${AppointmentStatusEnum}`;


export type AppointmentPaginationInterface = PaginatorInterface<AppointmentListItemInterface>