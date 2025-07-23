import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAppointmentsByRangeDate } from "../actions";
import { AppointmentListItemInterface } from "../intefaces";

export interface CalendarAppointmentState {
    appointments: AppointmentListItemInterface[]; // Lista de citas para el calendario
    isLoading: boolean; // Estado de carga para las citas del calendario
    setIsLoading: (isLoading: boolean) => void;
    setAppointments: (appointments: AppointmentListItemInterface[]) => void;
    resetSlice: () => void;
    fetchAppointments: (startDate: string, endDate: string) => Promise<void>;
}

// Slice para el estado de appointments
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const createCalendarAppointmentSlice = (set: any, get: any): CalendarAppointmentState => ({
    appointments: [],  // Lista de citas para el calendario
    isLoading: false, // Estado de carga para las citas del calendario
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading }, false, "app:calendarAppointment/setIsLoading");
    },
    setAppointments: (appointments: AppointmentListItemInterface[]) => {
        set({ appointments }, false, "app:calendarAppointment/setAppointments");
    },
    resetSlice: () => {
        set({
            appointments: [],
            isLoading: false,
        }, false, "app:calendarAppointment/resetSlice");
    },
    fetchAppointments: async (startDate: string, endDate: string) => {
        get().setIsLoading(true);

        try {
            // Aquí deberías llamar al servicio que obtiene las citas por rango de fechas
            const appointments = await getAppointmentsByRangeDate(startDate, endDate);
            get().setAppointments(appointments);
        } catch (error) {
            console.error("Error al obtener las citas del calendario:", error);
        } finally {
            get().setIsLoading(false);
        }
    }
});




// Hook de Zustand con DevTools
export const useCalendarAppointmentStore = create<CalendarAppointmentState>()(
    devtools(
        (set, get) => ({
            ...createCalendarAppointmentSlice(set, get), // Combina el slice con otros si es necesario
        }),
        { name: "CalendarAppointmentStore" } // Nombre que aparecerá en los devtools
    )
);