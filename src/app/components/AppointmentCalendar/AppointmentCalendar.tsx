"use client";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppointmentCalendarComponentInterface } from "./AppointmentCalendarComponentInterface";


const localizer = momentLocalizer(moment);

export default function AppointmentCalendar({ appointments }: AppointmentCalendarComponentInterface) {

    console.log(new Date(appointments[0].date_time).toDateString()); // Verifica el formato de date_time
    const events = appointments.map((appt) => ({
        id: appt.id,
        title: `Paciente: ${appt.patient || "N/A"}`,
        start: new Date(appt.date), // Asegúrate de que `date` y `time` estén en el formato correcto
        end: new Date(moment(appt.date_time).add(appt.duration_minutes, "minutes").toISOString()), // puedes ajustar la duración
        allDay: true,
        resource: appt,
    }));

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={{
                    today: "Hoy",
                    previous: "Anterior",
                    next: "Siguiente",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                }}
            />
        </div>
    );
}