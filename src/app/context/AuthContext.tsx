"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserInterface } from "../intefaces";
import apiClient from "../services/api";
import { routeNames } from "../routes";
import { useRouter } from "next/router";

// Define las propiedades del contexto
interface AuthContextProps {
    user: UserInterface | null;
    login: (email: string, password: string) => void;
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
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await apiClient.post(routeNames.login, { email, password });
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        apiClient.defaults.headers.Authorization = `Bearer ${data.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        delete apiClient.defaults.headers.Authorization;
        router.push(routeNames.login);
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
