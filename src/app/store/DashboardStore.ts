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
export const createDashboardStore = (set: any): DashboarStoreInterface => ({
    isLoading: initialState.isLoading,
    doctorDashboardInfo: {} as DoctorDashboardInfoInterface,
    getDoctorDashboard: async () => {
        set({ isLoading: true }, false, "app:dashboard/setIsloading");
        const response = await getDoctorDashboardInfo();
        set({ doctorDashboardInfo: response })

    },
    resetSlice : () => {
        set({ appointment: { ...initialState } }, false, "app:dashboardSlice/resetSlice");
    }
})