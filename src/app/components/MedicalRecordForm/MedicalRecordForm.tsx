import { formFieldLabel, messages } from "@/app/config";
import { PrescriptionItemInterface } from "@/app/intefaces";
import { useMedicalRecordStore } from "@/app/store";
import { ChangeEvent, useEffect, useState } from "react";
import { RecipeTable } from "../RecipeTable";
import { MedicalRecordFormInterface } from "./MedicalRecordFormInterface";

const mr = messages.medicalRecord;

export default function MedicalRecordForm({ initialData, handleCancel, handleSubmit, onlyViewMode = false }: MedicalRecordFormInterface) {

    const { formManageMedicalRecord } = useMedicalRecordStore()

    const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItemInterface[]>([
        { medication_name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ]);

    const { fields, errors, error } = initialData ? initialData : formManageMedicalRecord;


    const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // Agregar los items de la receta al FormData
        formData.append("prescription.items", JSON.stringify(prescriptionItems));
        if(handleSubmit) handleSubmit(formData);
    };

    const handleAddItem = () => {
        setPrescriptionItems((prev) => [
            ...prev,
            { medication_name: "", dosage: "", frequency: "", duration: "", notes: "" },
        ]);
    };

    const onHandleCancel = () => {
        handleCancel();
    };

    const onHandleChantePrescriptionItem = (e: ChangeEvent<HTMLInputElement>, indexItem: number) => {
        setPrescriptionItems(prev => {
            const newItems = [...prev];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error 
            newItems[indexItem][e.target.name] = e.target.value;
            return newItems;
        })
    }

    const onHandleRemoveItem = (index: number) => {
        setPrescriptionItems((prev) => prev.filter((_, i) => i !== index));
    }


    useEffect(() => {
        if (fields?.prescription?.items.length) {
            setPrescriptionItems(fields.prescription.items);
        }
    }, [fields])

    return (
        <>
            {/* 📌 Mensaje de error global */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={onHandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Síntomas */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(mr.labels.symptoms, Boolean(errors?.symptoms?.length))}
                    </label>
                    <textarea
                        name="symptoms"
                        rows={3}
                        defaultValue={fields?.symptoms}
                        className={`input-field resize-none ${errors?.symptoms?.length ? '!border-red-500' : ''}`}
                        placeholder={mr.placeholders.symptoms}
                        disabled={onlyViewMode}
                    />
                    {errors?.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
                </div>

                {/* Diagnóstico */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(mr.labels.diagnosis, Boolean(errors?.diagnosis?.length))}
                    </label>
                    <textarea
                        name="diagnosis"
                        rows={3}
                        defaultValue={fields?.diagnosis}
                        className={`input-field resize-none ${errors?.diagnosis?.length ? '!border-red-500' : ''}`}
                        placeholder={mr.placeholders.diagnosis}
                        disabled={onlyViewMode}
                    />
                    {errors?.diagnosis && <p className="text-red-500 text-sm">{errors.diagnosis}</p>}
                </div>

                {/* Tratamiento */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(mr.labels.treatment, Boolean(errors?.treatment?.length))}
                    </label>
                    <textarea
                        name="treatment"
                        rows={3}
                        defaultValue={fields?.treatment}
                        className={`input-field resize-none ${errors?.treatment?.length ? '!border-red-500' : ''}`}
                        placeholder={mr.placeholders.treatment}
                        disabled={onlyViewMode}
                    />
                    {errors?.treatment && <p className="text-red-500 text-sm">{errors.treatment}</p>}
                </div>

                {/* Notas */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(mr.labels.notes, Boolean(errors?.notes?.length))}
                    </label>
                    <textarea
                        name="notes"
                        rows={2}
                        defaultValue={fields?.notes}
                        className={`input-field resize-none ${errors?.notes?.length ? '!border-red-500' : ''}`}
                        placeholder={mr.placeholders.notes}
                        onChange={(e) => fields.notes = e.target.value}
                        disabled={onlyViewMode}
                    />
                    {errors?.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
                </div>

                {/* Sección de Receta */}
                <div className="md:col-span-2 mt-6">
                    <h3 className="text-lg font-semibold mb-2">{mr.labels.prescriptionSection}</h3>

                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(mr.labels.prescriptionNotes, Boolean(errors?.prescription?.notes?.length))}
                    </label>
                    <textarea
                        name="prescription.notes"
                        rows={2}
                        defaultValue={fields?.prescription.notes}
                        className={`input-field resize-none mb-4 ${errors?.prescription?.notes?.length ? '!border-red-500' : ''}`}
                        disabled={onlyViewMode}
                    />
                    {errors?.prescription?.notes && <p className="text-red-500 text-sm">{errors.prescription.notes}</p>}

                    <RecipeTable items={prescriptionItems} onHandleChantePrescriptionItem={onHandleChantePrescriptionItem} onHandleRemoveItem={onHandleRemoveItem} onlyViewMode={onlyViewMode} errors={errors} />
                       
                    {!onlyViewMode && (
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="btn-secondary mt-2"
                    >
                        {mr.actions.addMedication}
                    </button>
                    )}
                </div>

                {/* Acciones */}
                <div className="md:col-span-2 flex justify-between mt-6">
                    <button type="button" onClick={onHandleCancel} className="btn-secondary">
                        {mr.actions.cancel}
                    </button>
                    {!onlyViewMode && (         
                        <button type="submit" className="btn-primary">
                            {mr.actions.save}
                        </button>
                    )}
                </div>
            </form>
        </>
    )
}
