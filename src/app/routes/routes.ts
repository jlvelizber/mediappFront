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
        { label: 'Escritorio', route: routeNames.doctors },
        { label: 'Perfil', route: `${routeNames.doctors}${routeNames.profile}` },
        { label: 'Pacientes', route: `${routeNames.doctors}${routeNames.patients}` },
        { label: 'Agenda', route: `${routeNames.doctors}${routeNames.appointments}` },
        { label: 'Fichas medicas', route: `${routeNames.doctors}${routeNames.medicalHistory}` },
        { label: 'Disponibilidad', route: `${routeNames.doctors}${routeNames.availavility}` }
    ]
}]