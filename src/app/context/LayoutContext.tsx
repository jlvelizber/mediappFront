import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
const APP_NAME = process.env.NEXT_PUBLIC_TITLE || "Mediapp"; // Ajusta según tu backend.

interface LayoutContextInterface {
    titlePage: string;
    setTitlePage: Dispatch<React.SetStateAction<string>>;
}

// Define las propiedades del proveedor
interface LayoutProviderProps {
    children: ReactNode;
}


const LayoutContext = createContext<LayoutContextInterface | undefined>(undefined);

export const LayoutProvider = ({ children }: LayoutProviderProps): ReactNode => {
    const [titlePage, setTitlePage] = useState<string>("");

    useEffect(() => {

        if (titlePage === "") {
            document.title = APP_NAME;
        }
        else {
            document.title = `${titlePage} | ${APP_NAME}`;
        }

    }, [titlePage])

    return (<LayoutContext.Provider value={{ titlePage, setTitlePage }}>{children}</LayoutContext.Provider>);
}

export const useLayout = (): LayoutContextInterface => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de LayoutProvider");
    }
    return context;
};
