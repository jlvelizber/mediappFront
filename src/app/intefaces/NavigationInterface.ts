import { Icon } from "@primer/octicons-react";

export interface NavigationOption {
    label: string;
    route: string;
    icon?: Icon
}

export interface Navigation {
    role: string;
    options: NavigationOption[];
}