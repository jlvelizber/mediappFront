import { PrescriptionItemInterface } from "@/app/intefaces";
import { useMedicalRecordStore } from "@/app/store";
import { ChangeEvent, useEffect, useState } from "react";
import { MedicalRecordFormInterface } from "./MedicalRecordFormInterface";

export default function MedicalHistory({ initialData, handleCancel, handleSubmit }: MedicalRecordFormInterface) {

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
        handleSubmit(formData);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setPrescriptionItems(prev => {
            const newItems = [...prev];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error 
            newItems[indexItem][e.target.name] = e.target.value;
            return newItems;
        })
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
                    <label className="block text-sm font-medium text-gray-700">Síntomas</label>
                    <textarea
                        name="symptoms"
                        rows={3}
                        defaultValue={fields?.symptoms}
                        className={`input-field resize-none ${errors?.symptoms?.length ? '!border-red-500' : ''}`}
                        placeholder="Describa los síntomas del paciente..."
                    />
                    {errors?.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
                </div>

                {/* Diagnóstico */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Diagnóstico</label>
                    <textarea
                        name="diagnosis"
                        rows={3}
                        defaultValue={fields?.diagnosis}
                        className={`input-field resize-none ${errors?.diagnosis?.length ? '!border-red-500' : ''}`}
                        placeholder="Ingrese el diagnóstico clínico..."
                    />
                    {errors?.diagnosis && <p className="text-red-500 text-sm">{errors.diagnosis}</p>}
                </div>

                {/* Tratamiento */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Tratamiento</label>
                    <textarea
                        name="treatment"
                        rows={3}
                        defaultValue={fields?.treatment}
                        className={`input-field resize-none ${errors?.treatment?.length ? '!border-red-500' : ''}`}
                        placeholder="Describa el tratamiento indicado..."
                    />
                    {errors?.treatment && <p className="text-red-500 text-sm">{errors.treatment}</p>}
                </div>

                {/* Notas */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notas adicionales</label>
                    <textarea
                        name="notes"
                        rows={2}
                        defaultValue={fields?.notes}
                        className={`input-field resize-none ${errors?.notes?.length ? '!border-red-500' : ''}`}
                        placeholder="Ingrese notas adicionales..."
                        onChange={(e) => fields.notes = e.target.value}
                    />
                    {errors?.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
                </div>

                {/* Sección de Receta */}
                <div className="md:col-span-2 mt-6">
                    <h3 className="text-lg font-semibold mb-2">Receta Médica</h3>

                    <label className="block text-sm font-medium text-gray-700">Notas de la receta</label>
                    <textarea
                        name="prescription.notes"
                        rows={2}
                        defaultValue={fields?.prescription.notes}
                        className="input-field resize-none mb-4"
                    />
                    {errors?.prescription?.notes && <p className="text-red-500 text-sm">{errors.prescription.notes}</p>}

                    {/* Items de la receta */}
                    {prescriptionItems.map((item, index) => (
                        <div key={index} className="grid md:grid-cols-5 gap-2 mb-2">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Medicamento"
                                    name="medication_name"
                                    defaultValue={prescriptionItems[index]?.medication_name || fields?.prescription?.items?.[index]?.medication_name}
                                    onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                                    className="input-field"
                                />
                                {errors?.prescription?.items?.[index]?.medication_name && <p className="text-red-500 text-sm">{errors.prescription.items[index].medication_name}</p>}
                            </div>
                            <div>

                                <input
                                    type="text"
                                    placeholder="Dosis"
                                    name="dosage"
                                    defaultValue={prescriptionItems[index]?.dosage || fields?.prescription?.items?.[index]?.dosage}
                                    className="input-field"
                                    onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                                />

                                {errors?.prescription?.items?.[index]?.dosage && <p className="text-red-500 text-sm">{errors.prescription.items[index].dosage}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Frecuencia"
                                    name="frequency"
                                    defaultValue={prescriptionItems[index]?.frequency || fields?.prescription?.items?.[index]?.frequency}
                                    className="input-field"
                                    onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                                />
                                {errors?.prescription?.items?.[index]?.frequency && <p className="text-red-500 text-sm">{errors.prescription.items[index].frequency}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Duración"
                                    name="duration"
                                    defaultValue={prescriptionItems[index]?.duration || fields?.prescription?.items?.[index]?.duration}
                                    className="input-field"
                                    onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                                />
                                {errors?.prescription?.items?.[index]?.duration && <p className="text-red-500 text-sm">{errors.prescription.items[index].duration}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Notas"
                                    name="notes"
                                    defaultValue={prescriptionItems[index]?.notes || fields?.prescription?.items?.[index]?.notes}
                                    className="input-field"
                                    onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                                />
                            </div>
                            {errors?.prescription?.items?.[index]?.notes && <p className="text-red-500 text-sm">{errors.prescription.items[index].notes}</p>}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="btn-secondary mt-2"
                    >
                        + Añadir Medicamento
                    </button>
                </div>

                {/* Acciones */}
                < div className="md:col-span-2 flex justify-between mt-6" >
                    <button type="button" onClick={onHandleCancel} className="btn-secondary">
                        Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}