import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AvailabilityService } from '@/app/services';
import { DashboardLayout } from '@/app/components'
import { DateUtil } from '@/app/utils';
import type { DoctorAvailabilityInterface } from '@/app/intefaces';




export default function DoctorAvailability() {
    const { register, handleSubmit, reset } = useForm();
    const [availabilities, setAvailabilities] = useState<DoctorAvailabilityInterface[]>([]);
    const daysOfWeek = DateUtil.getDaysOfWeekAsObject();
     

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    const fetchAvailabilities = async () => {
        try {
            const response = await AvailabilityService.getMyAvailability();
            setAvailabilities(response);
        } catch (error) {
            console.error("Error fetching availability", error);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            await AvailabilityService.saveAvailability(data as DoctorAvailabilityInterface);
            reset();
            fetchAvailabilities();
        } catch (error) {
            console.error("Error saving availability", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Gestionar Disponibilidad</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <select {...register("day_of_week")} required className="border p-2 rounded mr-2">
                        {daysOfWeek.map((day) => (
                            <option key={day.id} value={day.value}>{day.label}</option>
                        ))}
                    </select>
                    <input type="time" {...register("start_time")} required className="border p-2 rounded mr-2" />
                    <input type="time" {...register("end_time")} required className="border p-2 rounded mr-2" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
                </form>
                <ul>
                    {availabilities.map((availability: DoctorAvailabilityInterface) => (
                        <li key={availability.id} className="border p-2 mb-2 rounded">
                            {availability.day_of_week} - {availability.start_time} to {availability.end_time}
                        </li>
                    ))}
                </ul>
            </div>

        </DashboardLayout>
    );
}
