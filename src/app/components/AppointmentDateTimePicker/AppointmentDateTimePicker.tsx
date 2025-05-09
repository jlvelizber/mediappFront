import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentDateTimePicker({ handleChange, value }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; value: string }) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    // const handleDateChange = (date: Date | null) => {
    //     setStartDate(date);
    //     if (date) {
    //         // handleChange({ target: { value: date.toISOString() } });
    //     }
    // };

    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" className="input-field" wrapperClassName="w-full" />
    );
}