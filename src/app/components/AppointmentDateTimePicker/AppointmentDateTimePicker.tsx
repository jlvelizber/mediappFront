import DatePicker from "react-datepicker";
import { AppointmentDateTimePickerInterface } from "./AppointmentDateTimePickerInterface";

import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentDateTimePicker({ value }: AppointmentDateTimePickerInterface) {
    return (
        <DatePicker
            value={value}
            selected={value ? new Date(value) : null}
            wrapperClassName="w-full"
            className="input-field"
            showTimeSelect
            dateFormat="Pp"
        />
    );
}