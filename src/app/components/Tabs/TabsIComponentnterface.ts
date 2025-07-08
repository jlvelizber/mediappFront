import { ReactNode } from "react";

export interface TabItem {
    label: string;
    value: string;
    icon?: ReactNode; // opcional
}

export interface TabsProps {
    tabs: TabItem[];
    active?: string;
    onChange?: (value: string) => void;
    children?: ReactNode;
}