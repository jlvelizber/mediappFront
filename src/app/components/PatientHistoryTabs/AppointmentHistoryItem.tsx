import { useAuth } from "@/app/context";
import { AppointmentStatusEnum, AppointmentWithMedicalRecord } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { CalendarIcon, ClockIcon, StopwatchIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import AppointmentStatusBadge from "../AppointmentStatusBadge";

interface AppointmentHistoryItemProps {
    appointment: AppointmentWithMedicalRecord;
}

export default function AppointmentHistoryItem({ appointment }: AppointmentHistoryItemProps) {
    const router = useRouter();
    const { user } = useAuth();
    const hasPrescription = appointment.has_prescription;
    return (
        <article className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            {/* Título de contexto: identifica la cita de un vistazo */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <AppointmentStatusBadge
                            status={(appointment.status as AppointmentStatusEnum) ?? AppointmentStatusEnum.COMPLETED}
                            text={appointment.status_label || appointment.status || ""}
                        />
                        {hasPrescription ? (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Tiene Prescripción
                            </span>
                        ) : (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                Sin prescripción
                            </span>
                        )}
                    </div>

                    {/* Fecha y hora destacadas */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                        {appointment.date && (
                            <div className="flex items-center gap-1.5" aria-label="Fecha de la cita">
                                <CalendarIcon className="w-4 h-4 text-gray-500" />
                                <span>{appointment.date}</span>
                            </div>
                        )}
                        {appointment.time && (
                            <div className="flex items-center gap-1.5" aria-label="Hora de la cita">
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span>{appointment.time}</span>
                            </div>
                        )}
                        {appointment.duration_minutes != null && appointment.duration_minutes !== "" && (
                            <div className="flex items-center gap-1.5" aria-label="Duración">
                                <StopwatchIcon className="w-4 h-4 text-gray-500" />
                                <span>{appointment.duration_minutes} min</span>
                            </div>
                        )}
                    </div>

                    {appointment.reason && (
                        <p className="text-sm text-gray-700">
                            <strong>Motivo:</strong> {appointment.reason}
                        </p>
                    )}

                    {/* Preview de diagnóstico si existe historia clínica */}
                    {hasPrescription && appointment.medicalRecord?.diagnosis && (
                        <p className="text-sm text-gray-600 line-clamp-2 border-l-2 border-gray-200 pl-3">
                            <strong className="text-gray-700">Diagnóstico:</strong> {appointment.medicalRecord.diagnosis}
                        </p>
                    )}
                </div>

                <div className="flex gap-2 sm:flex-col sm:gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={() => router.push(`/${user?.role}${routeNames.appointments}/${appointment.id}/medical-record/${appointment.medicalRecord?.id}/show`)}
                        className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:opacity-50 text-xs"
                        aria-label="Ver Detalle de esta cita"
                    >
                        Ver Detalle
                    </button>
                    {hasPrescription && (
                        <button
                            type="button"
                            onClick={() => router.push(`/${user?.role}${routeNames.appointments}/${appointment.id}/prescription/detail`)}
                            className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:opacity-50 text-xs"
                            aria-label="Ver Prescripción de esta cita"
                        >
                            Ver Prescripción
                        </button>
                    )}
                </div>

            </div>
        </article>
    );
}

