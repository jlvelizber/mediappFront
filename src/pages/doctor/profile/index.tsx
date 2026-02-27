import { DashboardLayout } from '@/app/components'
import React from 'react'

export default function DoctorProfile() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Perfil profesional</h1>
        <p className="text-sm text-gray-600 mt-2">
          Configura la información de tu consultorio y tus preferencias profesionales.
        </p>
      </div>
    </DashboardLayout>
  )
}
