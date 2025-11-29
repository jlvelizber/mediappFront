import { AppointmentInterface } from "./AppointmentInterface"

export interface DoctorDashboardInfoInterface {
    todayAppointments: number,
    totalPatients: number,
    weeklyStats: WeeklyStat,
    completedAppointments: number,
    nextAppointment: AppointmentInterface[],
    recentAppointments: AppointmentInterface[]
}

export interface WeeklyStat  {
    canceled : number,
    pending: number,
    confirmed: number
}