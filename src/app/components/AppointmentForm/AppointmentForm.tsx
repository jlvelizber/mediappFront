import { useAppointmentStore } from "@/app/store";
import { FormEvent, MouseEvent, useState } from "react";
import { AppointmentDateTimePicker } from "../AppointmentDateTimePicker";
import { AppointmentFormComponentInterface } from "./AppointmentFormComponentInterface";

export default function AppointmentForm({ initialData, handleCancel, handleSubmit, handleDelete, deps }: AppointmentFormComponentInterface) {

    const { formManageAppointment } = useAppointmentStore();
    const { patients } = deps || { patients: [] };
    const { errors, fields, error } = initialData ? initialData : formManageAppointment;
    const [dateTime, setDateTime] = useState<string>(fields?.date_time ?? '');




    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        handleSubmit(formData);
    }

    return (
        <>
            {/* 📌 Mensaje de error global */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={onHandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paciente */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Paciente</label>
                    <select name="patient_id" className={`input-field ${errors?.patient_id?.length ? '!border-red-500' : ''}`} defaultValue={fields?.patient_id ?? ''}>
                        <option value="">Seleccione un paciente</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {`${patient.name} ${patient.lastname}`}
                            </option>
                        ))}
                    </select>
                    {errors?.patient_id && <p className="text-red-500 text-sm">{errors.patient_id}</p>}
                </div>

                {/* Fecha y hora */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
                    <AppointmentDateTimePicker
                        name="date_time"
                        value={dateTime}
                        onChange={setDateTime}
                        className={`input-field ${errors?.date_time?.length ? '!border-red-500' : ''}`}
                    />
                    {errors?.date_time && <p className="text-red-500 text-sm">{errors.date_time.join(', ')}</p>}
                </div>

                {/* Motivo */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Motivo de la Cita</label>
                    <textarea name="reason" rows={3} className={`input-field ${errors?.reason?.length ? '!border-red-500' : ''}`} defaultValue={fields?.reason} />
                    {errors?.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                </div>

                {/* Botones */}
                <div className="md:col-span-2 flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                        <button type="button" onClick={handleCancel} className="btn-secondary">
                            {fields?.id ? "Regresar" : "Cancelar"}
                        </button>
                    </div>
                    {/* Botón de eliminar SOLO si la cita ya existe */}
                    {fields?.id && (
                        <button
                            type="button"
                            onClick={(e: MouseEvent<HTMLButtonElement>) => fields?.id !== undefined && handleDelete?.(e, fields.id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-md"
                        >
                            Eliminar Cita
                        </button>

                    )}
                    <button type="submit" className="btn-primary">
                        {fields?.id ? "Actualizar" : "Crear"} Cita
                    </button>

                </div>
            </form>
        </>
    );

}