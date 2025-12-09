import { PaginatorInterface } from "./PaginatorInterface";
import { PatientInterface } from "./PatientInterface";

export interface AppointmentInterface {
    id?: number,
    patient_id?: number | null,
    doctor_id?: number | null,
    date_time: string,
    status?: string,
    reason?: string,
    patient?: PatientInterface,
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
    duration_minutes: string,
    date_time: string,
    medical_record_id: number | null
}

export enum AppointmentStatusEnum {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}


export type AppointmentPaginationInterface = PaginatorInterface<AppointmentListItemInterface>