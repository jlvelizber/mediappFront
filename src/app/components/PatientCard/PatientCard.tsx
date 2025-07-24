import { PatientCardInterface } from "./PatientCardInterface";

export default function PatientCard({ patient }: PatientCardInterface) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">🧑‍⚕️ Información del Paciente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <div><strong>Nombre:</strong> {patient?.name} {patient?.lastname}</div>
                <div><strong>Documento:</strong> {patient?.document}</div>
                <div><strong>Email:</strong> {patient?.email}</div>
                <div><strong>Teléfono:</strong> {patient?.phone}</div>
                <div><strong>Dirección:</strong> {patient?.address}</div>
                <div><strong>Fecha de Nacimiento:</strong> {new Date(patient?.dob ? patient.dob : "").toLocaleDateString()}</div>
            </div>
        </div>
    );
}