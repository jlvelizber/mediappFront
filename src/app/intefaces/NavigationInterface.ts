export interface NavigationOption {
    label: string;
    route: string;
}

export interface Navigation {
    role: string;
    options: NavigationOption[];
}