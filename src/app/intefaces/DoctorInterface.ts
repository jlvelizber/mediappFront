export interface DoctorInterface {
    id?: number;
    user_id?: number;
    specialization: string;
}

export interface DoctorAvailabilityInterface {
    id?: number;
    doctor_id?: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
}