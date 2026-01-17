import { PrescriptionItemInterface } from "@/app/intefaces";
import { MedicalRecordFormDataInterface } from "../MedicalRecordForm/MedicalRecordFormInterface";

export interface RecipeTableInterface {
    items: PrescriptionItemInterface[];
    onHandleChantePrescriptionItem: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onHandleRemoveItem?: (index: number) => void;
    onlyViewMode: boolean;
    errors: MedicalRecordFormDataInterface["errors"];
}