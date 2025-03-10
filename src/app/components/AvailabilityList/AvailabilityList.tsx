import { Table } from '@/app/components'
import { DoctorAvailabilityInterface } from '@/app/intefaces'
import { FC } from 'react'
import { AvailabilityListInterface } from './AvailabilityListInterface'

export const AvailabilityList: FC<AvailabilityListInterface> = ({ items, onRemove }) => {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Disponibilidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map((availability: DoctorAvailabilityInterface) => (
                    <tr key={availability.id}>
                        <td>
                            {availability.day_of_week} - {availability.start_time} to {availability.end_time}
                        </td>
                        <td> <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => availability.id !== undefined && onRemove(availability.id)}> Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </Table>

    )
}
