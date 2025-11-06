import { DoctorDashboardInfoInterface } from "../intefaces";
import { apiClient } from "./api";

export const DashboardService = {
    route: "/dashboard",

    getDoctorDashboardInfo : async () : Promise<DoctorDashboardInfoInterface | null> => {
        try {
            const response = await apiClient.get(`${DashboardService.route}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching Dashboard Data:", error);
            return null;
        }
    }
}