"use client";
import clsx from 'clsx';
import moment from 'moment';
import "moment/locale/es"; // Importar el locale español
import { Calendar, momentLocalizer, } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppointmentCalendarComponentInterface } from "./AppointmentCalendarComponentInterface";

moment.locale("es"); // Establecer el locale a español

const localizer = momentLocalizer(moment);

export default function AppointmentCalendar({ appointments }: AppointmentCalendarComponentInterface) {

    const events = appointments.map((appt) => ({
        id: appt.id,
        title: `Paciente: ${appt.patient || "N/A"} - ${appt.status.charAt(0).toUpperCase() + appt.status_label.slice(1)} (${appt.time})`,
        start: moment(appt.date_time).toDate(), // Convertir a objeto Date nativo
        end: moment(appt.date_time).add(appt.duration_minutes, "minutes").toDate(), // Convertir a objeto Date nativo
        // allDay: true,
        resource: appt,

    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventPropGetter = (event: any) => {
        const status = event.resource.status;

        const className = clsx("rounded-md px-2 py-1 text-sm font-medium", {
            "!bg-status-pending !text-status-pending-text border !border-status-pending-border": status === "pending",
            "!bg-status-confirmed !text-status-confirmed-text border !border-status-confirmed-border": status === "confirmed",
            "!bg-status-cancelled !text-status-cancelled-text border !border-status-cancelled-border": status === "cancelled",
            // fallback
            "!bg-gray-100 !text-gray-600 !border border-gray-300": !["pending", "confirmed", "cancelled"].includes(status),
        });

        return {
            className,
        };
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultView="month"
                views={["month", "week", "day"]}
                eventPropGetter={eventPropGetter}
                messages={{
                    today: "Hoy",
                    previous: "Anterior",
                    next: "Siguiente",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Agenda",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                    showMore: (total) => `+ Ver más (${total})`,
                    noEventsInRange: "No hay eventos en este rango",
                    allDay: "Todo el día",
                }}
                selectable
                onSelectEvent={(event) => {
                    console.log("Evento seleccionado:", event);
                }}
                onShowMore={(events, date) => {
                    console.log("Mostrar más eventos:", events, "en la fecha:", date);
                }}
            />
        </div>
    );
}