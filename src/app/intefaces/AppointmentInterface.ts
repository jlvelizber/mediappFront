import { PaginatorInterface } from "./PaginatorInterface";

export interface AppointmentInterface {
    id?: number,
    patient_id: number | null,
    doctor_id: number | null,
    date_time: string,
    status: string,
    reason: string,
    created_at?: string,
    updated_at?: string
}

export interface AppointmentListItemInterface {
    id: number,
    patient: string,
    date: string,
    time: string,
    status: string,
    status_label: string,
    duration_minutes: string,
    date_time: string
}

export type AppointmentStatusInterface = "pending" | "confirmed" | "completed" | "cancelled";


export type AppointmentPaginationInterface = PaginatorInterface<AppointmentListItemInterface>