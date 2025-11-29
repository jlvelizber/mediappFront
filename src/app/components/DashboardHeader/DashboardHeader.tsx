import { FC } from 'react'
import { DashboardHeaderProps } from './DashboardHeaderInterface'

export const DashboardHeader: FC<DashboardHeaderProps> = ({ doctorName }) => {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">👋 Bienvenido, {doctorName}</h1>
            <p className="text-gray-500 text-sm">Aquí tienes un resumen de tus actividades médicas recientes.</p>
        </div>
    )
}