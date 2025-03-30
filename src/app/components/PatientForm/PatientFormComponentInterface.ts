import { PatientInterface } from "@/app/intefaces";
import { MouseEvent } from "react";

export interface PatientFormComponentInterface {
    initialData?: PatientFormDataInterface,
    handleSubmit: (data: FormData) => void,
    handleCancel: (e: MouseEvent<HTMLButtonElement>) => void;
    handleDelete?: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void;
}

export interface PatientFormDataInterface {
    fields: PatientInterface,
    errors: Record<string, string[]>,
    error: string
}