import { PatientInterface } from "@/app/intefaces";
import { EyeIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import { EmptyState } from "../EmptyState";
import { Loader } from "../Loader";
import { Table } from "../Table";
import { PatientListInterface } from "./PatientListInterface";

export default function PatientList({ items, fetching, actions: { onRemove, onEdit, onView } }: PatientListInterface) {
    return (
        <Table headers={['Identificación', 'Nombre', 'Telf.', 'C. Electrónico', 'Acciones']} shadow>
            {fetching ? (<tr><td colSpan={5}><Loader onScreen={false} /></td></tr>) : ""}
            {!fetching && !items.length ? <tr> <td colSpan={5}> < EmptyState /></td> </tr> : ""}
            {!fetching && items.map((patient: PatientInterface) => (
                <tr key={patient.id} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-2 text-gray-700 w-1/12">
                        <span className="font-medium"> {patient.document} </span>
                    </td>
                    <td className="px-6 py-2 text-gray-700 w-6/12">
                        <span className="font-medium"> {patient.name} </span>
                    </td>
                    <td className="px-6 py-2">
                        {patient.phone}
                    </td>
                    <td className="px-6 py-2">
                        {patient.email}
                    </td>
                    <td className="px-6 py-2 flex justify-between mx-auto">
                        <button className="btn-secondary" aria-label="Editar" title={`Editar paciente ${patient.name}`} onClick={(e) => patient.id !== undefined && onEdit(e, patient.id)}> <PencilIcon /></button>
                        <button className="btn-secondary" aria-label="Ver" title={`Ver paciente ${patient.name}`} onClick={(e) => patient.id !== undefined && onView(e, patient.id)}> <EyeIcon /></button>
                        <button className="btn-danger" aria-label="Eliminar" title={`Eliminar paciente ${patient.name}`} onClick={(e) => patient.id !== undefined && onRemove(e, patient.id)}> <TrashIcon /></button>
                    </td>
                </tr>
            ))}
        </Table>

    )

}
