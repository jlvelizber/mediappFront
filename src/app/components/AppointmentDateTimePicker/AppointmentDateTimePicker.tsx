import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Utilidad para formatear la fecha
function formatDateToYMDHIS(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        " " +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds())
    );
}

interface AppointmentDateTimePickerProps {
    value?: string; // Y-m-d H:i:s
    onChange: (value: string) => void;
    name?: string;
    className?: string;
}

export default function AppointmentDateTimePicker({
    value,
    onChange,
    name,
    className,
}: AppointmentDateTimePickerProps) {
    // Convierte el string a Date para el picker
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        value ? new Date(value.replace(" ", "T")) : null
    );

    useEffect(() => {
        setSelectedDate(value ? new Date(value.replace(" ", "T")) : null);
    }, [value]);

    const handleChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            onChange(formatDateToYMDHIS(date));
        } else {
            onChange("");
        }
    };
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            name={name}
            className={`${className}`}
            wrapperClassName="input-field"
            timeFormat="HH:mm"
            timeIntervals={20}
        />
    );
}