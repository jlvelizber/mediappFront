import { DashboardHeader, DashboardLayout, Loader, PatientsSummary, RecentAppointments } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth, useLayout } from "@/app/context";
import { useDoctorDashboardStore } from "@/app/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const AppointmentsChart = dynamic(
  () => import("@/app/components").then((mod) => ({ default: mod.AppointmentsChart })),
  { ssr: false }
);


export default function Index() {
  const TITLE_PAGE = "Dashboard";
  const { doctorDashboardInfo, getDoctorDashboard, isLoading } = useDoctorDashboardStore()
  const { loading: loadingDataMessage } = messages.dashboard
  const { user } = useAuth();

  const { setTitlePage } = useLayout();

  useEffect(() => {
    setTitlePage(TITLE_PAGE)
    getDoctorDashboard()
  }, [])

  if (isLoading) return <Loader message={loadingDataMessage} />

  const chartData = doctorDashboardInfo?.chartData || [];
  const recentAppointments = doctorDashboardInfo?.recentAppointments || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <DashboardHeader doctorName={user?.name} />
        <PatientsSummary {...doctorDashboardInfo} />
        <AppointmentsChart data={chartData} />
        <RecentAppointments appointments={recentAppointments} />
      </div>
    </DashboardLayout>
  )
}