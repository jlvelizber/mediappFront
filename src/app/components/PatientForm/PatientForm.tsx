"use client"; // 📌 Necesario para usar Server Actions en el frontend

import { formFieldLabel, messages } from "@/app/config";
import { usePatientStore } from "@/app/store";
import { getGenders } from "@/app/utils";
import { FormEvent, MouseEvent } from "react";
import { PatientFormComponentInterface } from "./PatientFormComponentInterface";

const labels = messages.patient.labels;
const patientActions = messages.patient.actions;
const common = messages.common;

export default function PatientForm({ initialData, handleCancel, handleSubmit, handleDelete }: PatientFormComponentInterface) {

    const { formManagePatient } = usePatientStore();

    const { errors, fields, error } = initialData ? initialData : formManagePatient;

    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        handleSubmit(formData);
    }

    return (
        <>
            {/* 📌 Mensaje de error global */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={onHandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Documento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.document, Boolean(errors?.document?.length))}
                    </label>
                    <input name="document" type="text" className={`input-field ${errors?.document?.length ? '!border-red-500' : ''}`} defaultValue={fields?.document} />
                    {errors?.document && <p className="text-red-500 text-sm">{errors.document}</p>}
                </div>

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.name, Boolean(errors?.name?.length))}
                    </label>
                    <input name="name" type="text" className={`input-field ${errors?.name?.length ? '!border-red-500' : ''}`} defaultValue={fields?.name} />
                    {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Apellido */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.lastname, Boolean(errors?.lastname?.length))}
                    </label>
                    <input name="lastname" type="text" className={`input-field ${errors?.lastname?.length ? '!border-red-500' : ''}`} defaultValue={fields?.lastname} />
                    {errors?.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.email, Boolean(errors?.email?.length))}
                    </label>
                    <input name="email" type="email" className={`input-field ${errors?.email?.length ? '!border-red-500' : ''}`} defaultValue={fields?.email} />
                    {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.phone, Boolean(errors?.phone?.length))}
                    </label>
                    <input name="phone" type="tel" className={`input-field ${errors?.phone?.length ? '!border-red-500' : ''}`} defaultValue={fields?.phone} />
                    {errors?.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.address, Boolean(errors?.address?.length))}
                    </label>
                    <input name="address" type="text" className={`input-field ${errors?.address?.length ? '!border-red-500' : ''}`} defaultValue={fields?.address} />
                    {errors?.address && <p className="text-red-500 text-sm">{errors.address.join(',')}</p>}
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.dob, Boolean(errors?.dob?.length))}
                    </label>
                    <input name="dob" type="date" className={`input-field ${errors?.dob?.length ? '!border-red-500' : ''}`} defaultValue={fields?.dob} />
                    {errors?.dob && <p className="text-red-500 text-sm">{errors.dob.join(',')}</p>}
                </div>

                {/* Género */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        {formFieldLabel(labels.gender, Boolean(errors?.gender?.length))}
                    </label>
                    <select name="gender" className={`input-field ${errors?.gender?.length ? '!border-red-500' : ''}`} defaultValue={fields?.gender}>
                        <option value="">{common.form.selectOption}</option>
                        {
                            getGenders().map(({ value, label }, index) => (<option selected={fields?.gender === value} key={index} value={value}>{label}</option>))
                        }
                    </select>
                    {errors?.gender && <p className="text-red-500 text-sm">{errors.gender.join(',')}</p>}
                </div>

                {/* Botones */}
                <div className="md:col-span-2 flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                        <button type="button" onClick={handleCancel} className="btn-secondary">
                            {fields?.id ? common.actions.back : common.actions.cancel}
                        </button>
                        {/* Botón de eliminar SOLO si el paciente ya existe */}
                        {fields?.id && (
                            <button
                                type="button"
                                onClick={(e: MouseEvent<HTMLButtonElement>) => fields?.id !== undefined && handleDelete?.(e, fields.id)}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-md"
                            >
                                {patientActions.deletePatient}
                            </button>

                        )}
                    </div>
                    <button type="submit" className="btn-primary">
                        {fields?.id
                            ? patientActions.submitUpdate
                            : patientActions.submitCreate}
                    </button>
                </div>


            </form>
        </>
    );
}
