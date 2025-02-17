import { createContext, Dispatch, ReactNode, useContext, useState } from "react";

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

    return (<LayoutContext.Provider value={{ titlePage, setTitlePage }}>{children}</LayoutContext.Provider>);
}

export const useLayout = (): LayoutContextInterface => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de LayoutProvider");
    }
    return context;
};
