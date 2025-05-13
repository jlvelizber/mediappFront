import { AppointmentInterface, PatientInterface } from "@/app/intefaces";
import { MouseEvent } from "react";

export interface AppointmentFormComponentInterface {
    initialData?: AppointmentFormDataInterface;
    deps?: {
        patients: PatientInterface[];
    };

    handleSubmit: (data: FormData) => void,
    handleCancel: (e: MouseEvent<HTMLButtonElement>) => void;
    handleDelete?: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void;
}

export interface AppointmentFormDataInterface {
    fields: AppointmentInterface,
    errors: Record<string, string[]>,
    error: string
}