import { useAuth } from "@/app/context";
import { AppointmentWithMedicalRecord } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { CalendarIcon, LinkExternalIcon, PackageIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";

interface PrescriptionsHistoryProps {
    appointments?: AppointmentWithMedicalRecord[];
}

export default function PrescriptionsHistory({ appointments = [] }: PrescriptionsHistoryProps) {
    const router = useRouter();
    const { user } = useAuth();

    const prescriptions = appointments
        .filter(app => app.medicalRecord?.prescription)
        .map(app => ({
            appointment: app,
            prescription: app.medicalRecord!.prescription
        }));

    if (prescriptions.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay prescripciones registradas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {prescriptions.map(({ appointment, prescription }) => {
                const hasItems = prescription.items?.length > 0;
                const recordId = appointment.medicalRecord?.id ?? appointment.medical_record_id;

                return (
                    <article
                        key={prescription.id ?? appointment.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
                    >
                        {/* Cabecera: contexto de la cita y enlace a historia */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <PackageIcon className="w-5 h-5 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        Receta {appointment.date ? `— Cita del ${appointment.date}` : ""}
                                    </h3>
                                    {appointment.time && (
                                        <p className="text-sm text-gray-500">{appointment.time}</p>
                                    )}
                                </div>
                            </div>
                            {recordId && (
                                <button
                                    type="button"
                                    onClick={() => router.push(`/${user?.role}${routeNames.appointments}/${appointment.id}/medical-record/${recordId}/show`)}
                                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline shrink-0"
                                    aria-label="Ver historia clínica completa de esta cita"
                                >
                                    <LinkExternalIcon className="w-4 h-4" />
                                    Ver historia clínica
                                </button>
                            )}
                        </div>

                        {/* Notas del médico */}
                        {prescription.notes && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs font-medium text-blue-800 uppercase tracking-wide mb-1">Indicaciones generales</p>
                                <p className="text-sm text-gray-700">{prescription.notes}</p>
                            </div>
                        )}

                        {/* Lista de medicamentos */}
                        {hasItems ? (
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-700 text-sm">Medicamentos</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 list-none p-0 m-0">
                                    {prescription.items!.map((item, index) => (
                                        <li
                                            key={item.id ?? index}
                                            className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                                        >
                                            <div className="font-medium text-gray-900 mb-2">
                                                {item.medication_name || "Sin nombre"}
                                            </div>
                                            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-gray-600">
                                                {item.dosage && (
                                                    <>
                                                        <dt className="text-gray-500">Dosis</dt>
                                                        <dd>{item.dosage}</dd>
                                                    </>
                                                )}
                                                {item.frequency && (
                                                    <>
                                                        <dt className="text-gray-500">Frecuencia</dt>
                                                        <dd>{item.frequency}</dd>
                                                    </>
                                                )}
                                                {item.duration && (
                                                    <>
                                                        <dt className="text-gray-500">Duración</dt>
                                                        <dd>{item.duration}</dd>
                                                    </>
                                                )}
                                            </dl>
                                            {item.notes && (
                                                <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                                                    <span className="font-medium text-gray-600">Notas: </span>
                                                    {item.notes}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="py-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
                                Sin medicamentos en esta receta
                                {prescription.notes && " (solo indicaciones generales)."}
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
}

