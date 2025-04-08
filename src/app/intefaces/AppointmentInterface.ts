import { PaginatorInterface } from "./PaginatorInterface"

export interface AppointmentInterface {
    id?: number,
    patient_id: number,
    doctor_id: number,
    status: string,
    date: string,
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
}


export type AppointmentPaginationInterface = PaginatorInterface<AppointmentListItemInterface>