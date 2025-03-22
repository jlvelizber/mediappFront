import { PatientInterface } from "@/app/intefaces";
import { MouseEvent } from "react";

export interface PatientListInterface {
    items: PatientInterface[],
    fetching: boolean,
    actions: {
        onRemove: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void,
        onEdit: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void,
    }
}