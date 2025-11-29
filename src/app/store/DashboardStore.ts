import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { getDoctorDashboardInfo } from "../actions/dashboardActions";
import { DoctorDashboardInfoInterface } from "../intefaces";

export interface DashboarStoreInterface {
    isLoading : boolean;
    doctorDashboardInfo: DoctorDashboardInfoInterface ;
    getDoctorDashboard : () => Promise<void>;
    resetSlice: () => void;
}

const initialState  = {
    isLoading: false,
    doctorDashboardInfo: {} as DoctorDashboardInfoInterface
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const createDashboardStoreSlice = (set: any, get: unknown): DashboarStoreInterface => ({
    isLoading: initialState.isLoading,
    doctorDashboardInfo: {} as DoctorDashboardInfoInterface,
    getDoctorDashboard: async () => {
        try {
            set({ isLoading: true }, false, "app:dashboard/setIsloading");
            const response : DoctorDashboardInfoInterface  = await getDoctorDashboardInfo();
            set({ doctorDashboardInfo: response?.response }, false, "app:dashboard/setDataDashboard")
            
        } catch (error) {
            throw error;
        } finally {

            set({ isLoading: false }, false, "app:dashboard/setIsloading");
        }

    },
    resetSlice : () => {
        set({ appointment: { ...initialState } }, false, "app:dashboardSlice/resetSlice");
    }
})


// Hook de Zustand con DevTools
export const useDoctorDashboardStore = create<DashboarStoreInterface>()(
    devtools(
        (set, get) => ({
            ...createDashboardStoreSlice(set, get), // Combina el slice con otros si es necesario
        }),
        { name: "MedicalRecordStore", storage: createJSONStorage(() => localStorage) } // Nombre que aparecerá en los devtools
    )
);