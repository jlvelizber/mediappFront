import { AppointmentStatusBadgeInterface } from "./AppointmentStatusBadgeInterface";

export default function AppointmentStatusBadge({ status, text }: AppointmentStatusBadgeInterface) {

    const styleMap = {
        pending: "bg-status-pending text-status-pending-text border-status-pending-border",
        confirmed: "bg-status-confirmed text-status-confirmed-text border-status-confirmed-border",
        completed: "bg-status-completed text-status-completed-text border-status-completed-border",
        cancelled: "bg-status-cancelled text-status-cancelled-text border-status-cancelled-border",
    };
    return (
        <span
            className={`inline-block text-xs font-medium px-2 py-1 border rounded-md ${styleMap[status]}`}
        >
            {text}
        </span>
    );
}