import { AppointmentInterface, PatientInterface } from "@/app/intefaces";
import { MouseEvent } from "react";

export interface AppointmentFormComponentInterface {
    initialData?: AppointmentFormDataInterface;
    deps?: {
        patients: PatientInterface[];
    };

    handleCancel: (e: MouseEvent<HTMLButtonElement>) => void;
    handleSubmit: (data: FormData) => void,
    handleDelete?: (e: MouseEvent<HTMLButtonElement>, patientId: number) => void;
}

export interface AppointmentFormDataInterface {
    fields: AppointmentInterface,
    errors: Record<string, string[]>,
    error: string
}