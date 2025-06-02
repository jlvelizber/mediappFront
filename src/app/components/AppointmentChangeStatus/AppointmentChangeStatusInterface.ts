export interface AppointmentChangeStatusInterface {
    appointmentId: number;
    status: string;
    mustUpdateList?: boolean;
}