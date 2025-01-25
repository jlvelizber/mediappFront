'use client'

import { useState, FormEvent } from "react";
import { useAuth } from "@/app/context";
import apiClient from "@/app/services/api";

const Index: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();
    const routePostLogin = "/auth/login";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post(routePostLogin, { email, password });
            login(response.data.user); // Guarda al usuario autenticado
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Index;
