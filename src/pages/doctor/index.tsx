import { DashboardHeader, DashboardLayout, PatientsSummary, RecentAppointments } from "@/app/components";
import { useLayout } from "@/app/context";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const AppointmentsChart = dynamic(
  () => import("@/app/components").then((mod) => ({ default: mod.AppointmentsChart })),
  { ssr: false }
);


export default function Index() {

  const TITLE_PAGE = "Dashboard";

  const { setTitlePage } = useLayout();

   // Ejemplo de datos mock
   const doctor = { name: "Dr. Juan Pérez" };
   const summary = { totalPatients: 45, todayAppointments: 3, completedAppointments: 12 };
   const recentAppointments = [
     { id: 1, patient: { name: "Ana López"}, date_time: "2025-10-30T10:00", status: "completed" },
     { id: 2, patient: { name: "Carlos Ruiz"}, date_time: "2025-10-30T11:30", status: "pending" },
   ];

   const chartData = [
    { date: "Lun", total: 3 },
    { date: "Mar", total: 4 },
    { date: "Mié", total: 2 },
    { date: "Jue", total: 5 },
    { date: "Vie", total: 3 },
  ];


  useEffect(() => setTitlePage(TITLE_PAGE), [setTitlePage])

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
      <DashboardHeader doctorName={doctor.name} />
      <PatientsSummary {...summary} />
      <AppointmentsChart data={chartData} />
      <RecentAppointments appointments={recentAppointments} />
      </div>
    </DashboardLayout>
  )
}