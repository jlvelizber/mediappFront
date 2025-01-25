"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInterface } from "../intefaces";

// Define las propiedades del contexto
interface AuthContextProps {
    user: UserInterface | null;
    login: (userData: UserInterface) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define las propiedades del proveedor
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {

    const [user, setUser] = useState<UserInterface | null>(null);

    const login = (userData: UserInterface) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (<AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>);

};

export const useAuth = (): AuthContextProps => {
    debugger
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};
