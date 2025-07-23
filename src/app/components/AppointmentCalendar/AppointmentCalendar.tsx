"use client";
import { AppointmentListItemInterface } from '@/app/intefaces';
import { useCalendarAppointmentStore } from '@/app/store';
import clsx from 'clsx';
import moment from 'moment';
import "moment/locale/es"; // Importar el locale español
import { useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer, } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppointmentCalendarComponentInterface } from "./AppointmentCalendarComponentInterface";

moment.locale("es"); // Establecer el locale a español

const localizer = momentLocalizer(moment);

export default function AppointmentCalendar({ handleSelectEvent, defaultView }: AppointmentCalendarComponentInterface) {

    const { appointments: dataAppointments, fetchAppointments } = useCalendarAppointmentStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [events, setEvents] = useState<any[]>([]);
    const calendar = useRef<Calendar | null>(null);

    useEffect(() => {
        if (calendar.current) {
            // Get visible dates in the current view
            const view = calendar.current.props.view || defaultView || "month";
            console.log("Current view:", view);
            if (calendar.current) {
                let visibleDates: Date[] = [];
                const dateProp = calendar.current.props.date;
                let date: Date;
                if (!dateProp) {
                    date = new Date();
                } else if (dateProp instanceof Date) {
                    date = dateProp;
                } else {
                    date = new Date(dateProp);
                }
                visibleDates = getVisibleDates(view, date);
                handleRangeChange({ start: visibleDates[0], end: visibleDates[visibleDates.length - 1] });
            }

        }
    }, []);


    useEffect(() => {
        if (dataAppointments && dataAppointments.length > 0) {
            const castedEvents = castEvents(dataAppointments);
            setEvents(castedEvents);
        } else {
            setEvents([]);
        }
    }, [dataAppointments]);

    /**
 * Function to get visible dates based on the current view and date.
 * @param view 
 * @param date 
 * @returns Date[] - Array of visible dates based on the current view and date.
 */
    const getVisibleDates = (view: string, date: Date): Date[] => {
        const visibleDates: Date[] = [];
        if (view === "month") {
            const start = moment(date).startOf("month").startOf("week");
            const end = moment(date).endOf("month").endOf("week");
            const day = start.clone();
            while (day.isSameOrBefore(end, "day")) {
                visibleDates.push(day.toDate());
                day.add(1, "day");
            }
        } else if (view === "week") {
            const start = moment(date).startOf("week");
            for (let i = 0; i < 7; i++) {
                visibleDates.push(start.clone().add(i, "day").toDate());
            }
        } else if (view === "day") {
            visibleDates.push(moment(date).toDate());
        }
        return visibleDates;
    };

    const castEvents = (appointments: AppointmentListItemInterface[]) => {
        return appointments
            ? appointments.map((appt) => ({
                id: appt.id,
                title: `Paciente: ${appt.patient || "N/A"} - ${appt.status.charAt(0).toUpperCase() + appt.status_label.slice(1)} (${appt.time})`,
                start: moment(appt.date_time).toDate(),
                end: moment(appt.date_time).add(appt.duration_minutes, "minutes").toDate(),
                resource: appt,
            }))
            : [];
    };


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


    // onChangeRange
    const handleRangeChange = (range: { start: Date; end: Date } | Date[]) => {
        const start = Array.isArray(range) ? range[0] : range.start;
        const end = Array.isArray(range) ? range[range.length - 1] : range.end;
        const [startDate, endDate] = [moment(start).format("YYYY-MM-DD"), moment(end).format("YYYY-MM-DD")];
        fetchAppointments(startDate, endDate);
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultView={defaultView || "month"}
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
                onSelectEvent={handleSelectEvent}
                onRangeChange={handleRangeChange}
                ref={calendar} // Ref for potential future use

            />
        </div>
    );
}