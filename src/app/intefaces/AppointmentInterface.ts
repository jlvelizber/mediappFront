import { PaginatorInterface } from "./PaginatorInterface";

export interface AppointmentInterface {
    id?: number,
    patient_id: number | null,
    doctor_id: number | null,
    status: string,
    date: string | Date,
    reason: string,
    start_time: string,
    end_time: string,
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
}

export type AppointmentStatusInterface = "pending" | "completed" | "cancelled";


export type AppointmentPaginationInterface = PaginatorInterface<AppointmentListItemInterface>