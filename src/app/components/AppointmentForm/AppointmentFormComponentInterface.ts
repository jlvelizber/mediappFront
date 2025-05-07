import { AppointmentInterface, PatientInterface } from "@/app/intefaces";

export interface AppointmentFormComponentInterface {
    initialData?: AppointmentFormDataInterface;
    deps?: {
        patients: PatientInterface[];
    };
    handleCancel: () => void;
    handleSubmit: (data: unknown) => void;
    handleDelete?: (appId: number) => void;
}

export interface AppointmentFormDataInterface {
    fields: AppointmentInterface,
    errors: Record<string, string[]>,
    error: string
}