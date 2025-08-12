import { AxiosError } from "axios";
import { MedicalRecordFormDataInterface } from "../components";
import { MedicalRecordInterface } from "../intefaces";
import { MedicalRecordService } from "../services/MedicalRecordService";

export async function createMedicalRecord(prevState: MedicalRecordFormDataInterface, formData: FormData): Promise<MedicalRecordFormDataInterface | { success: boolean; medicalRecord: MedicalRecordInterface }> {
    // Convertir FormData a un objeto
    const entries = Object.fromEntries(formData.entries()) as unknown as MedicalRecordInterface;
    const prescriptionNote = formData.get("prescription.notes") as string;
    const data: MedicalRecordInterface = {
        appointment_id: entries.appointment_id,
        symptoms: entries.symptoms,
        diagnosis: entries.diagnosis,
        treatment: entries.treatment,
        notes: formData.get("notes") as string,
        prescription: {
            appointment_id: entries.appointment_id,
            notes: prescriptionNote,
            items: JSON.parse(formData.get("prescription.items") as string) || []
        }
    }
    try {
        // 📌 Aquí iría la lógica para guardar en la base de datos
        console.log("Medical record guardado: ", data.id);
        const medicalRecord = await MedicalRecordService.saveMedicalRecord(data);
        return { success: true, medicalRecord };

    } catch (error: unknown) {
        debugger
        prevState.fields = data;
        const axiosError = error as AxiosError;
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.error = "Error al guardar la ficha medica. " + axiosError.response?.data?.message
        // @ts-expect-error: axiosError.response may be undefined or not have a data property
        prevState.errors = axiosError.response?.data?.errors
        return prevState;
    }
}