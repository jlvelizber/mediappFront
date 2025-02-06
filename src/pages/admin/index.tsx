import { AdminDashboard, DashboardLayout } from "@/app/components";
import { useAuth } from "@/app/context";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Admin() {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/');
        }
    }, [router, user]);

    return (
        <DashboardLayout>
            <div>¡Bienvenido al panel de administración!</div>
            <AdminDashboard />
        </DashboardLayout>
    );
}