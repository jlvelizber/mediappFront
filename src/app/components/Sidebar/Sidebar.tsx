import { useState } from "react";
import { ListUnorderedIcon, PersonIcon, TabIcon, XCircleIcon } from '@primer/octicons-react'
import { useAuth } from "@/app/context";
import { Navigation } from "../Navigation";
import { UserRoleEnum } from "@/app/Enums";

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user, logout } = useAuth();

    const handleLogout = () => logout();


    const renderMenu = () => {
        return user?.role ? <Navigation role={user.role as UserRoleEnum} /> : null;
    }

    return (
        <>
            {/* Botón de menú en móviles */}
            <button
                className={`md:hidden fixed top-4 transition-transform  ${isOpen ? 'translate-x-0 left-36' : 'left-4 -translate-x-1 '} bg-primary text-white p-2 rounded z-50`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <XCircleIcon className="w-6 h-6 text-white z-50" /> : <ListUnorderedIcon className="w-6 h-6" />}
            </button>
            <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white p-6 transition-transform z-40 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static flex flex-col`}>
                {/* Logo / Nombre */}
                <div className="flex items-center space-x-3 border-b border-white/20 pb-4">
                    <PersonIcon className="w-8 h-8 text-accent" />
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                </div>
                <ul className="flex-1 mt-6 space-y-2">
                    {renderMenu()}
                </ul>
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition" onClick={handleLogout}>
                    <TabIcon className="w-5 h-5 mr-2" />
                    Cerrar sesion
                </button>
            </aside>

            {/* Overlay para cerrar el menú tocando fuera */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
