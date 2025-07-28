'use client';
import { AppointmentStatusInterface } from "@/app/intefaces";
import { useAppointmentStore } from "@/app/store";
import { CheckCircleIcon, XCircleIcon } from "@primer/octicons-react";
import { AppointmentChangeStatusInterface } from "./AppointmentChangeStatusInterface";

export default function AppointmentChangeStatus({ appointmentId, status, mustUpdateList }: AppointmentChangeStatusInterface) {

    const { updateStateAppointment } = useAppointmentStore();
    const onChangeStatus = async (id: number, newStatus: AppointmentStatusInterface) => {
        // Aquí deberías implementar la lógica para cambiar el estado de la cita
        console.log(`Cambiando estado de la cita ${id} a ${newStatus}`);
        await updateStateAppointment(id, newStatus, mustUpdateList);
    };

    return (
        <>
            {status === "pending" && (
                <>
                    <button
                        onClick={() => onChangeStatus(appointmentId, "confirmed")}
                        className="flex items-center gap-2 bg-status-confirmed-text text-white text-xs px-3 py-1 rounded-md"
                        title="Confirmar cita"
                        aria-label="Confirmar cita"
                    >
                        <CheckCircleIcon className="w-4 h-4" />
                        Confirmar
                    </button>
                    <button
                        onClick={() => onChangeStatus(appointmentId, "cancelled")}
                        className="flex items-center gap-2 bg-status-cancelled-text text-white text-xs px-3 py-1 rounded-md"
                        title="Cancelar cita"
                        aria-label="Cancelar cita"
                    >
                        <XCircleIcon className="w-4 h-4" />
                        Cancelar
                    </button>
                </>
            )}

            {status === "confirmed" && (
                <>

                    <button
                        onClick={() => onChangeStatus(appointmentId, "cancelled")}
                        className="flex items-center gap-2 bg-status-cancelled-text text-white text-xs px-3 py-1 rounded-md"
                        title="Cancelar cita"
                        aria-label="Cancelar cita"
                    >
                        <XCircleIcon className="w-4 h-4" />
                        Cancelar
                    </button>

                </>
            )}
        </>
    )
}