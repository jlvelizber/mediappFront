import { AppointmentInterface } from "@/app/intefaces";
import { MouseEvent } from "react";

export interface AppointmentListInterface {
    items: AppointmentInterface[],
    fetching: boolean,
    actions: {
        onRemove: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void,
        onEdit: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void,
    }
}