import DatePicker from "react-datepicker";
import { AppointmentDateTimePickerInterface } from "./AppointmentDateTimePickerInterface";

import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentDateTimePicker(props: AppointmentDateTimePickerInterface) {
    return (
        <DatePicker
            wrapperClassName="w-full"
            className="input-field"
            showTimeSelect
            dateFormat="Pp"
            {...props}
        />
    );
}