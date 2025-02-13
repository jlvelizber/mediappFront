import { useAuth } from "@/app/context";
import { UserRoleEnum } from "@/app/Enums";
import { Navigation } from "../Navigation";


export function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { user, logout } = useAuth();

    const handleLogout = () => logout()

    const renderMenu = () => {
        return user?.role ? <Navigation role={user.role as UserRoleEnum} /> : null;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white h-screen p-4">
                <h2 className="text-lg font-bold">Dashboard</h2>
                <ul className="mt-4">
                    {renderMenu()}
                    <li>🔹  <button onClick={handleLogout}> Cerrar sesion</button> </li>
                </ul>
            </aside>

            {/* Contenido */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
