import { AppointmentListItemInterface } from "@/app/intefaces";
import { MouseEvent } from "react";

export interface AppointmentListInterface {
    items: AppointmentListItemInterface[],
    fetching: boolean,
    actions: {
        onRemove: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void,
        onEdit: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void,
        onAttendAppointment?: (appointmentId: number) => void,
        onView: (e: MouseEvent<HTMLButtonElement>, appointmentId: number, medicalRecordId: number | null) => void
    }
}