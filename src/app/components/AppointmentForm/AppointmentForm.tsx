import { FormEvent } from "react";
import { AppointmentDateTimePicker } from "../AppointmentDateTimePicker";
import { AppointmentFormComponentInterface } from "./AppointmentFormComponentInterface";

export default function AppointmentForm({ handleCancel, handleSubmit, handleDelete, deps }: AppointmentFormComponentInterface) {

    const { patients } = deps || { patients: [] };

    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        handleSubmit(formData);
    }
    return (
        <form onSubmit={onHandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Paciente */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Paciente</label>
                <select name="patient_id" defaultValue={""} className="input-field">
                    <option value="">Seleccione un paciente</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {`${patient.name} ${patient.lastname}`}
                        </option>
                    ))}
                </select>
                {/* {state.errors.patient_id && <p className="text-red-500 text-sm">{state.errors.patient_id}</p>} */}
            </div>

            {/* Fecha y hora */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
                {/* <input type="datetime-local" name="date_time" defaultValue={""} className="input-field" /> */}
                <AppointmentDateTimePicker handleChange={() => { }} value="" />
                {/* {state.errors.date_time && <p className="text-red-500 text-sm">{state.errors.date_time}</p>} */}
            </div>

            {/* Motivo */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Motivo de la Cita</label>
                <textarea name="reason" defaultValue={""} rows={3} className="input-field" />
                {/* {state.errors.reason && <p className="text-red-500 text-sm">{state.errors.reason}</p>} */}
            </div>

            {/* Botones */}
            <div className="md:col-span-2 flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button type="button" onClick={handleCancel} className="btn-secondary">
                        {/* {fields?.id ? "Regresar" : "Cancelar"} */}
                        Cancelar
                    </button>
                    {/* Botón de eliminar SOLO si el paciente ya existe */}
                    {/* {fields?.id && ( */}
                    <button
                        type="button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete?.(e)}
                        // onClick={(e: MouseEvent<HTMLButtonElement>) => fields?.id !== undefined && handleDelete?.(e, fields.id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-md"
                    >
                        Eliminar Cita
                    </button>

                    {/* )} */}
                    <button type="submit" className="btn-primary">
                        {/* {fields?.id ? "Actualizar" : "Crear"} Paciente */}
                        Crear cita
                    </button>
                </div>
            </div>
        </form>
    );

}