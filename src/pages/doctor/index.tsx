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

  // Ejemplo de datos mock
  const recentAppointments = [
    { id: 1, patient: { name: "Ana López" }, date_time: "2025-10-30T10:00", status: "completed" },
    { id: 2, patient: { name: "Carlos Ruiz" }, date_time: "2025-10-30T11:30", status: "pending" },
  ];

  const chartData = [
    { date: "Lun", total: 3 },
    { date: "Mar", total: 4 },
    { date: "Mié", total: 2 },
    { date: "Jue", total: 5 },
    { date: "Vie", total: 3 },
  ];


  useEffect(() => {
    setTitlePage(TITLE_PAGE)
    getDoctorDashboard()
  }, [])


  useEffect(() => {if(doctorDashboardInfo) console.log(doctorDashboardInfo)}, [doctorDashboardInfo])

  if (isLoading) return <Loader message={loadingDataMessage} />

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