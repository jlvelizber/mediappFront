import { DashboardLayout } from "@/app/components/Layouts";
import { useAuth } from "@/app/context/AuthContext";

export default function AppointmentsPage() {
    const { user } = useAuth();


    if (!user) {
        return <p>Cargando...</p>;
    }
    return <DashboardLayout>Bienvenido {user.name}, aquí están tus citas</DashboardLayout>;
}
