import { AppointmentInterface, AppointmentStatusEnum } from "@/app/intefaces";
import { FC, useMemo } from "react";
import { RecentAppointmentsProps } from "./RecentAppointmentsInterface";

export const RecentAppointments: FC<RecentAppointmentsProps> = ({ appointments }) => {
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }),
    []
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Citas recientes</h2>
      <div className="divide-y">
        {appointments && appointments.length > 0 ? (
          appointments.map((a: AppointmentInterface) => (
            <div key={a.id} className="flex justify-between py-2">
              <div>
                <p className="font-medium text-gray-700">
                  {a.patient?.name}
                  {a.patient?.lastname && ` ${a.patient?.lastname}`}
                </p>
                <p className="text-sm text-gray-500">
                  {a.date_time ? dateFormatter.format(new Date(`${a.date_time}Z`)) : ""}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  a.status === AppointmentStatusEnum.COMPLETED                   ? "bg-green-100 text-green-700"
                    : a.status === AppointmentStatusEnum.PENDING
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            No hay citas recientes.
          </p>
        )}
      </div>
    </div>
  );
};
