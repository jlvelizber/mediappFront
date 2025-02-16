import { Navigation } from "../Navigation";
import { useAuth } from "@/app/context";
import { UserRoleEnum } from "@/app/Enums";
//import { HomeIcon, UserIcon, CalendarIcon, DocumentTextIcon } from "@heroicons/react/outline";

export default function Sidebar() {

    const { user, logout } = useAuth();

    const handleLogout = () => logout()

    const renderMenu = () => {
        return user?.role ? <Navigation role={user.role as UserRoleEnum} /> : null;
    }

    return (
        <aside className="w-64 bg-primary text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Menu</h1>
            <ul className="space-y-4">
                {renderMenu()}
                <li><button onClick={handleLogout}> Cerrar sesion</button> </li>
            </ul>
        </aside>
    );
}
