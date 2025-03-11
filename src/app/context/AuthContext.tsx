"use client";

import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthInterface, UserInterface } from "../intefaces";
import { routeNames } from "../routes";
import { AuthService } from "../services";
import * as ApiClient from "../services/api";

// Define las propiedades del contexto
interface AuthContextProps {
    user: UserInterface | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define las propiedades del proveedor
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {

    const [user, setUser] = useState<UserInterface | null>(null);
    const router = useRouter();


    useEffect(() => {
        const token = localStorage.getItem("token");
        const storeUser = localStorage.getItem("user");

        if (token && storeUser) {
            setUser(JSON.parse(storeUser));
            return
        }
        AuthService.getMe().then(setUser).catch(() => setUser(null));
        return
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const data: AuthInterface = await AuthService.login(email, password);
            setUser(data.user);
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }
            localStorage.setItem('user', JSON.stringify(data.user));
            ApiClient.apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return true;
        } catch (error) {
            console.log(`error while login` + error);
            return false;
        }
    };

    const logout = async () => {
        router.push(routeNames.login);
        setUser(null);
        await AuthService.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete ApiClient.apiClient.defaults.headers.Authorization;
        document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (<AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>);

};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};
