import { PrescriptionItemInterface } from "@/app/intefaces";
import { useState } from "react";
import { MedicalRecordFormInterface } from "./MedicalRecordFormInterface";

export default function MedicalHistory({ handleCancel, handleSubmit }: MedicalRecordFormInterface) {

    const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItemInterface[]>([
        { medication_name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ]);


    const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
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

    return (<form onSubmit={onHandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Síntomas */}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Síntomas</label>
            <textarea
                name="symptoms"
                rows={3}
                // defaultValue={fields?.symptoms}
                className="input-field resize-none"
                placeholder="Describa los síntomas del paciente..."
            />
        </div>

        {/* Diagnóstico */}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Diagnóstico</label>
            <textarea
                name="diagnosis"
                rows={3}
                // defaultValue={fields?.diagnosis}
                className="input-field resize-none"
                placeholder="Ingrese el diagnóstico clínico..."
            />
        </div>

        {/* Tratamiento */}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tratamiento</label>
            <textarea
                name="treatment"
                rows={3}
                // defaultValue={fields?.treatment}
                className="input-field resize-none"
                placeholder="Describa el tratamiento indicado..."
            />
        </div>

        {/* Notas */}
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Notas adicionales</label>
            <textarea
                name="notes"
                rows={2}
                // defaultValue={fields?.notes}
                className="input-field resize-none"
            />
        </div>

        {/* Sección de Receta */}
        <div className="md:col-span-2 mt-6">
            <h3 className="text-lg font-semibold mb-2">Receta Médica</h3>

            <label className="block text-sm font-medium text-gray-700">Notas de la receta</label>
            <textarea
                name="prescription_notes"
                rows={2}
                // defaultValue={prescription?.notes}
                className="input-field resize-none mb-4"
            />

            {/* Items de la receta */}
            {prescriptionItems.map((item, index) => (
                <div key={index} className="grid md:grid-cols-5 gap-2 mb-2">
                    <input
                        type="text"
                        name={`medication_name_${index}`}
                        placeholder="Medicamento"
                        defaultValue={item.medication_name}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name={`dosage_${index}`}
                        placeholder="Dosis"
                        defaultValue={item.dosage}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name={`frequency_${index}`}
                        placeholder="Frecuencia"
                        defaultValue={item.frequency}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name={`duration_${index}`}
                        placeholder="Duración"
                        defaultValue={item.duration}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name={`notes_${index}`}
                        placeholder="Notas"
                        defaultValue={item.notes}
                        className="input-field"
                    />
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
        <div className="md:col-span-2 flex justify-between mt-6">
            <button type="button" onClick={onHandleCancel} className="btn-secondary">
                Cancelar
            </button>
            <button type="submit" className="btn-primary">
                Guardar
            </button>
        </div>
    </form>
    )
}