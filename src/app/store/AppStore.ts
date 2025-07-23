import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAppointmentSlice } from "./AppointmentStore";
import { createAuthStoreSlice } from "./AuthStore";
import { createCalendarAppointmentSlice } from "./CalendarAppointmentStore";
import { createPatientSlice } from "./PatientStore";
import { createToastSlice } from "./ToastStore";


const allResets = (set: unknown, get: unknown) => [
    createAppointmentSlice(set, get).resetSlice,
    createPatientSlice(set, get).resetSlice,
    createToastSlice(set).resetSlice,
    createAuthStoreSlice(set, get).resetSlice,
    createCalendarAppointmentSlice(set, get).resetSlice,
];

export const useAppStore = create()(
    devtools((set, get) => ({
        ...createPatientSlice(set, get),
        ...createToastSlice(set),
        ...createAppointmentSlice(set, get),
        ...createAuthStoreSlice(set, get),
        ...createCalendarAppointmentSlice(set, get),
        resetSlice: () => allResets(set, get).forEach((reset) => reset()), // Llama a todos los resets de los slices
    })),
);