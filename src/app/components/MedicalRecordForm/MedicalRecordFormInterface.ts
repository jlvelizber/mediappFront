export interface MedicalRecordFormInterface {
    initialData?: object;
    handleCancel: () => void;
    handleSubmit: (formData: FormData) => void;
}