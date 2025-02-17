import React, { useState } from 'react';
import { GearIcon, PersonIcon as Person, TabIcon } from '@primer/octicons-react'
import { useAuth } from '@/app/context';

export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user, logout } = useAuth();
    const handleLogout = () => logout()

    if (!user) return null;
    return (
        <div className="relative">
            {/* Botón de usuario */}
            <button
                className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Person className="w-6 h-6 text-primary" />
                <span className="hidden sm:block font-medium text-primary">{user.name} </span>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-gray-700">
                        <li>
                            <a href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                <Person className="w-5 h-5 mr-2" />
                                Ver Perfil
                            </a>
                        </li>
                        <li>
                            <a href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                <GearIcon className="w-5 h-5 mr-2" />
                                Configuración
                            </a>
                        </li>
                        <li>
                            <button className="flex w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                                <TabIcon className="w-5 h-5 mr-2" />
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Cierra el menú al hacer clic afuera */}
            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            )}
        </div>
    )
}
