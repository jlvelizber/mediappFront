import { DoctorDashboardInfoInterface } from "../intefaces";
import { DashboardService } from "../services/DashboardService";


/**
 * 
 * @returns DashboardInfo
 */
export async function getDoctorDashboardInfo () : Promise<{ dashboardInfo: DoctorDashboardInfoInterface | null }> {
        const response: DoctorDashboardInfoInterface | null = await DashboardService.getDoctorDashboardInfo()
        return { dashboardInfo: response };
}