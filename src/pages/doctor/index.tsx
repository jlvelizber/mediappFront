import { DashboardLayout, DoctorDashboard } from "@/app/components";
import { useLayout } from "@/app/context";
import { useEffect } from "react";


export default function Index() {

  const TITLE_PAGE = "Dashboard";

  const { setTitlePage } = useLayout();

  useEffect(() => setTitlePage(TITLE_PAGE), [setTitlePage])

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        ¡Bienvenidos Dosctores! <DoctorDashboard/>  

      </div>
    </DashboardLayout>
  )
}