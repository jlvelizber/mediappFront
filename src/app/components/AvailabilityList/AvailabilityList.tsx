import { DoctorAvailabilityInterface } from '@/app/intefaces'
import { TrashIcon } from '@primer/octicons-react'
import { FC } from 'react'
import { AvailabilityListInterface } from './AvailabilityListInterface'


export const AvailabilityList: FC<AvailabilityListInterface> = ({ items, onRemove }) => {
    const formatDay = (dayOfWeek: string): string =>
        dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    const sortedItems = [...items].sort((a, b) => {
        const daySortOrder: Record<string, number> = {
            lunes: 1,
            martes: 2,
            miercoles: 3,
            jueves: 4,
            viernes: 5,
            sabado: 6,
            domingo: 7,
        };

        const dayDiff = (daySortOrder[a.day_of_week] ?? 99) - (daySortOrder[b.day_of_week] ?? 99);
        if (dayDiff !== 0) return dayDiff;

        return a.start_time.localeCompare(b.start_time);
    });

    return (
        <div className="space-y-3">
            {sortedItems.map((availability: DoctorAvailabilityInterface) => (
                <article
                    key={availability.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                {formatDay(availability.day_of_week)}
                            </span>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">{availability.start_time}</span> a{" "}
                                <span className="font-medium">{availability.end_time}</span>
                            </p>
                        </div>
                        <button
                            className="btn-danger inline-flex items-center gap-2"
                            onClick={() => availability.id !== undefined && onRemove(availability.id)}
                            title="Eliminar horario"
                            aria-label="Eliminar horario"
                        >
                            <TrashIcon />
                            Eliminar
                        </button>
                    </div>
                </article>
            ))}
        </div>

    )
}
