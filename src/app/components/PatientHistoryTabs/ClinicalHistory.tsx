import { AppointmentWithMedicalRecord } from "@/app/intefaces";
import { CalendarIcon, FileIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context";
import { routeNames } from "@/app/routes";

interface ClinicalHistoryProps {
    appointments?: AppointmentWithMedicalRecord[];
}

export default function ClinicalHistory({ appointments = [] }: ClinicalHistoryProps) {
    const router = useRouter();
    const { user } = useAuth();

    const medicalRecords = appointments.filter(app => app.medicalRecord);

    if (medicalRecords.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay historias clínicas registradas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {medicalRecords.map((appointment) => {
                const record = appointment.medicalRecord;
                if (!record) return null;

                return (
                    <div
                        key={record.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-2">
                                    <FileIcon className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold text-lg">
                                        Historia Clínica #{record.id}
                                    </h3>
                                    {appointment.date && (
                                        <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>{appointment.date}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    {record.symptoms && (
                                        <div>
                                            <strong className="text-gray-700 block mb-1">Síntomas:</strong>
                                            <p className="text-gray-600 line-clamp-3">{record.symptoms}</p>
                                        </div>
                                    )}
                                    {record.diagnosis && (
                                        <div>
                                            <strong className="text-gray-700 block mb-1">Diagnóstico:</strong>
                                            <p className="text-gray-600 line-clamp-3">{record.diagnosis}</p>
                                        </div>
                                    )}
                                    {record.treatment && (
                                        <div>
                                            <strong className="text-gray-700 block mb-1">Tratamiento:</strong>
                                            <p className="text-gray-600 line-clamp-3">{record.treatment}</p>
                                        </div>
                                    )}
                                    {record.notes && (
                                        <div>
                                            <strong className="text-gray-700 block mb-1">Notas:</strong>
                                            <p className="text-gray-600 line-clamp-3">{record.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => router.push(`/${user?.role}${routeNames.appointments}/${appointment.id}/medical-record/${record.id}/show`)}
                                className="btn-primary text-sm px-4 py-2 whitespace-nowrap self-start sm:self-center"
                            >
                                Ver Completa
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

