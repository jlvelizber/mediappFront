import { BrowserIcon, CalendarIcon, PeopleIcon, ToolsIcon } from "@primer/octicons-react";
import { UserRoleEnum } from "../Enums";
import { Navigation } from "../intefaces";

export const routeNames = {
    login: '/auth/login',
    logout: '/auth/logout',
    admin: '/admin',
    doctors: '/doctor',
    dashboard: '/',
    profile: '/profile',
    patients: '/patients',
    appointments: '/appointments',
    reports: '/reports',
    medicalHistory: '/medical-history',
    notAllowed: '/403',
    availavility: '/availavility',
}



export const navigation: Navigation[] = [{
    role: UserRoleEnum.Doctor,
    options: [
        { label: 'Escritorio', route: routeNames.doctors, icon: BrowserIcon },
        { label: 'Agenda', route: `${routeNames.doctors}${routeNames.appointments}`, icon: CalendarIcon },
        { label: 'Pacientes', route: `${routeNames.doctors}${routeNames.patients}`, icon: PeopleIcon },
        { label: 'Configuración', route: `${routeNames.doctors}${routeNames.availavility}`, icon: ToolsIcon }
    ]
}]