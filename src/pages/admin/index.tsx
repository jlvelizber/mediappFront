import { AdminDashboard, DashboardLayout } from "@/app/components";

export default function Admin() {

   

    return (
        <DashboardLayout>
            <div>¡Bienvenido al panel de administración!</div>
            <AdminDashboard />
        </DashboardLayout>
    );
}