'use client'
import { useAuth, useLayout } from "@/app/context";
import { useCSFR } from "@/app/hooks";
import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react';
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
const APP_NAME = process.env.NEXT_PUBLIC_TITLE || "Mediapp"; // Ajusta según tu backend.

export default function Login() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();
    const { setTitlePage } = useLayout();
    const { getCSRFToken } = useCSFR();

    useEffect(() => {
        setTitlePage("");
        getCSRFToken();
    }, []);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const wasSuccess: boolean = await login(email, password);
            if (wasSuccess) router.push("/")
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-semibold text-primary text-center mb-6">{APP_NAME}</h1>
                <h2 className="text-l font-bold text-gray-800 text-center mb-6">Iniciar sesión</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                            required
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                            required
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg shadow-md transition"
                    >
                        Iniciar sesión
                    </button>
                </form>
                {/* Link de "Olvidaste tu contraseña?" */}
                <p className="text-sm text-gray-600 text-center mt-4 hidden">
                    <a href="#" className="text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </p>
            </div>
        </div>
    );
};
