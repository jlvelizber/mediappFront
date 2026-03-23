import { messages } from "@/app/config/messages";
import { BrowserIcon, CalendarIcon, PeopleIcon, ToolsIcon } from "@primer/octicons-react";
import { NavigationOption } from "../intefaces";

export const routeNames = {
    login: '/auth/login',
    setup: '/setup',
    logout: '/auth/logout',
    doctors: '/doctor',
    dashboard: '/doctor',
    settings: '/settings',
    profile: '/profile',
    patients: '/patients',
    appointments: '/appointments',
    reports: '/reports',
    medicalHistory: '/medical-history',
    notAllowed: '/403',
    availavility: '/availavility',
}



export const doctorNavigation: NavigationOption[] = [
    { label: messages.navigation.desk, route: routeNames.doctors, icon: BrowserIcon },
    { label: messages.navigation.agenda, route: `${routeNames.doctors}${routeNames.appointments}`, icon: CalendarIcon },
    { label: messages.navigation.patients, route: `${routeNames.doctors}${routeNames.patients}`, icon: PeopleIcon },
    { label: messages.navigation.settings, route: `${routeNames.doctors}${routeNames.settings}`, icon: ToolsIcon }
];