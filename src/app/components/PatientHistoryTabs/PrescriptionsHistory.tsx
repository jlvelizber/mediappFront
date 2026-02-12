import { AppointmentWithMedicalRecord } from "@/app/intefaces";
import { CalendarIcon, PackageIcon } from "@primer/octicons-react";

interface PrescriptionsHistoryProps {
    appointments?: AppointmentWithMedicalRecord[];
}

export default function PrescriptionsHistory({ appointments = [] }: PrescriptionsHistoryProps) {
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
            {prescriptions.map(({ appointment, prescription }) => (
                <div
                    key={prescription.id || appointment.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <PackageIcon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">Prescripción</h3>
                        {appointment.date && (
                            <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{appointment.date}</span>
                            </div>
                        )}
                    </div>

                    {prescription.notes && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">{prescription.notes}</p>
                        </div>
                    )}

                    {prescription.items && prescription.items.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-700 text-sm">Medicamentos:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                                {prescription.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                                    >
                                        <div className="space-y-1 text-sm">
                                            <div className="font-medium text-gray-900">
                                                {item.medication_name || "Sin nombre"}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                {item.dosage && (
                                                    <div>
                                                        <strong>Dosis:</strong> {item.dosage}
                                                    </div>
                                                )}
                                                {item.frequency && (
                                                    <div>
                                                        <strong>Frecuencia:</strong> {item.frequency}
                                                    </div>
                                                )}
                                                {item.duration && (
                                                    <div>
                                                        <strong>Duración:</strong> {item.duration}
                                                    </div>
                                                )}
                                            </div>
                                            {item.notes && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    <strong>Notas:</strong> {item.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

