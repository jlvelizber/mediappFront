export interface AppointmentFormComponentInterface {
    initialData?: unknown;
    handleCancel: () => void;
    handleSubmit: (data: unknown) => void;
    handleDelete?: (appId: number) => void;
}