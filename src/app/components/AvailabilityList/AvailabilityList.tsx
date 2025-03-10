import { Table } from '@/app/components'
import { DoctorAvailabilityInterface } from '@/app/intefaces'
import { FC } from 'react'
import { AvailabilityListInterface } from './AvailabilityListInterface'

export const AvailabilityList: FC<AvailabilityListInterface> = ({ items, onRemove }) => {

    return (
        <Table headers={['Disponibilidad', 'Acciones']} shadow>
            {items.map((availability: DoctorAvailabilityInterface) => (
                <tr key={availability.id} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-2 text-gray-700 w-full">
                        <span className="font-medium"> {availability.day_of_week} </span> - {availability.start_time} hasta {availability.end_time}
                    </td>
                    <td className="px-6 py-2 w-full flex mx-auto">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition" onClick={() => availability.id !== undefined && onRemove(availability.id)}> Eliminar</button>
                    </td>
                </tr>
            ))}

        </Table>

    )
}
