import { View } from "react-big-calendar";

export type AppointmentCalendarComponentInterface = {
    handleSelectEvent?: (event: unknown) => unknown;
    defaultView?: View;
}