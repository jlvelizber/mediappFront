import { AppointmentWithMedicalRecord } from "@/app/intefaces";
import AppointmentHistoryItem from "./AppointmentHistoryItem";

interface AppointmentsHistoryProps {
    appointments?: AppointmentWithMedicalRecord[];
}

export default function AppointmentsHistory({ appointments = [] }: AppointmentsHistoryProps) {
    if (appointments.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay citas registradas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {appointments.map((appointment) => (
                <AppointmentHistoryItem key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
}

