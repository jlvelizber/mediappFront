import { useAuth } from "@/app/context";
import { AppointmentWithMedicalRecord } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { CalendarIcon, ClockIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import AppointmentStatusBadge from "../AppointmentStatusBadge";

interface AppointmentHistoryItemProps {
    appointment: AppointmentWithMedicalRecord;
}

export default function AppointmentHistoryItem({ appointment }: AppointmentHistoryItemProps) {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <AppointmentStatusBadge 
                            status={appointment.status as any} 
                            text={appointment.status_label || appointment.status || ""} 
                        />
                        {appointment.medicalRecord?.id && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Historia Clínica
                            </span>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                        {appointment.date && (
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{appointment.date}</span>
                            </div>
                        )}
                        {appointment.time && (
                            <div className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>{appointment.time}</span>
                            </div>
                        )}
                    </div>

                    {appointment.reason && (
                        <p className="text-sm text-gray-700 mt-2">
                            <strong>Motivo:</strong> {appointment.reason}
                        </p>
                    )}
                </div>

                <div className="flex gap-2 sm:flex-col sm:gap-2">
                    {appointment.medicalRecord?.id && (
                        <button
                            onClick={() => router.push(`/${user?.role}${routeNames.appointments}/${appointment.id}/medical-record/${appointment.medicalRecord?.id}/show`)}
                            className="btn-primary text-sm px-4 py-2 whitespace-nowrap"
                        >
                            Ver Historia
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

