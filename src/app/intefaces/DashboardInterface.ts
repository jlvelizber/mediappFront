import { AppointmentInterface } from "./AppointmentInterface"

export interface DoctorDashboardInfoInterface {
    todayAppointments: number,
    totalPatients: number,
    weeklyStats: WeeklyStat,
    nextAppointment: AppointmentInterface []
}

export interface WeeklyStat  {
    canceled : number,
    pending: number,
    confirmed: number
}