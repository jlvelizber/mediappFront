import { AppointmentInterface } from "./AppointmentInterface"

export interface DoctorDashboardInfoInterface {
    todayAppointments: number,
    totalPatients: number,
    weeklyStats: WeeklyStat,
    completedAppointments: number,
    nextAppointment: AppointmentInterface[],
    recentAppointments: AppointmentInterface[],
    chartData: ChartDataItem[]
}

export interface ChartDataItem {
    date: string,
    total: number
}

export interface WeeklyStat  {
    canceled : number,
    pending: number,
    confirmed: number
}