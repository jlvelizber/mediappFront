import { ProtectedRoute } from "@/app/components";
import { useAuth } from "@/app/context";
import { UserRoleEnum } from "@/app/Enums";
import { routeNames } from "@/app/routes";
import Link from "next/link";

export function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { user, logout } = useAuth();
    const doctorBasePath = routeNames.doctors;

    const handleLogout =  () =>   logout()

    return (
        <ProtectedRoute allowedRole={user?.role}>
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white h-screen p-4">
                    <h2 className="text-lg font-bold">Dashboard</h2>
                    <ul className="mt-4">
                        {user?.role === UserRoleEnum.Admin && <li>🔹 <a href="/admin/users">Usuarios</a></li>}
                        {user?.role === UserRoleEnum.Doctor && <li>🔹 <Link href={doctorBasePath + routeNames.appointments}>Mis Citas</Link></li>}
                        <li>🔹 <a href="/profile">Perfil</a></li>
                        <li>🔹  <a href="#" onClick={handleLogout}> Cerrar sesion</a> </li>
                    </ul>
                </aside>

                {/* Contenido */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </ProtectedRoute>
    );
}
