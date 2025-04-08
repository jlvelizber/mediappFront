import { AppointmentListItemInterface } from "@/app/intefaces";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
import { EmptyState } from "../EmptyState";
import { Loader } from "../Loader";
import { Table } from "../Table";
import { AppointmentListInterface } from "./AppointmentListInterface";

export default function AppointmentList({ items, fetching, actions: { onRemove, onEdit } }: AppointmentListInterface) {
    return (
        <Table headers={['Estado', 'Paciente', 'Fecha/Hora', 'Acciones']} shadow>
            {fetching ? (<tr><td colSpan={4}><Loader onScreen={false} /></td></tr>) : ""}
            {!fetching && !items.length ? <tr> <td colSpan={4}> < EmptyState /></td> </tr> : ""}
            {!fetching && items.map((appointment: AppointmentListItemInterface) => (
                <tr key={appointment.id} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-2">{appointment.status}</td>
                    <td className="px-6 py-2">{appointment.patient}</td>
                    <td className="px-6 py-2">{appointment.date} - {appointment.time} </td>
                    <td className="px-6 py-2 flex justify-between mx-auto">
                        <button className="btn-secondary" aria-label="Editar" title={`Editar cita ${appointment.id}`} onClick={(e) => appointment.id !== undefined && onEdit(e, appointment.id)}> <PencilIcon /></button>
                        <button className="btn-danger" aria-label="Eliminar" title={`Eliminar cita ${appointment.id}`} onClick={(e) => appointment.id !== undefined && onRemove(e, appointment.id)}> <TrashIcon /></button>
                    </td>
                </tr>
            ))}
        </Table>

    )

}
