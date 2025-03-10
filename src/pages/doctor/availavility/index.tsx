import { AvailabilityList, DashboardLayout, PageWrapper } from '@/app/components';
import { useLayout } from '@/app/context';
import type { DoctorAvailabilityInterface } from '@/app/intefaces';
import { AvailabilityService } from '@/app/services';
import { DateUtil } from '@/app/utils';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";




export default function DoctorAvailability() {
    const { register, handleSubmit, reset } = useForm();
    const { setTitlePage } = useLayout();
    const [availabilities, setAvailabilities] = useState<DoctorAvailabilityInterface[]>([]);
    const daysOfWeek = DateUtil.getDaysOfWeekAsObject();
    const TITLE_PAGE = "Disponibilidades"

    useEffect(() => {
        fetchAvailabilities();
        setTitlePage(TITLE_PAGE)
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
            await AvailabilityService.saveMyAvailability(data as DoctorAvailabilityInterface);
            reset();
            fetchAvailabilities();
        } catch (error) {
            console.error("Error saving availability", error);
        }
    };

    const handleRemoveAvailability = async (itemId: number) => {
        try {
            await AvailabilityService.removeAvailability(itemId);
            fetchAvailabilities()
        } catch (error) {
            console.log('error removing', error)
        }
    }

    return (
        <DashboardLayout>
            <PageWrapper>
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
                    <AvailabilityList items={availabilities} onRemove={handleRemoveAvailability} />
                </div>
            </PageWrapper>
        </DashboardLayout>
    );
}
