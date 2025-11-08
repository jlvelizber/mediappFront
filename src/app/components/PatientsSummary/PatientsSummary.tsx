import { StatsCard } from "@/app/components";
import { CalendarIcon, CheckCircleIcon, PeopleIcon } from "@primer/octicons-react";
import { FC } from "react";
import { PatientsSummaryProps } from "./PatientsSummaryInterface";


export const PatientsSummary: FC<PatientsSummaryProps> = ({
  totalPatients,
  todayAppointments,
  completedAppointments,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard title="Pacientes activos" value={totalPatients} icon={<PeopleIcon />} />
      <StatsCard title="Citas hoy" value={todayAppointments} icon={<CalendarIcon />} />
      <StatsCard title="Citas completadas" value={completedAppointments} icon={<CheckCircleIcon />} />
    </div>
  );
};
