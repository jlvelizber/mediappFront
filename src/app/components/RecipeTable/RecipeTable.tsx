import { PrescriptionItemInterface } from "@/app/intefaces"
import { TrashIcon } from "@primer/octicons-react"
import { FC } from "react"
import { RecipeTableInterface } from "./RecipeTableInterface"

export const RecipeTable: FC<RecipeTableInterface> = ({ items, onHandleChantePrescriptionItem, onHandleRemoveItem, onlyViewMode, errors }) => {
    return (
        <>
            {items.map((_item: PrescriptionItemInterface, index: number) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-4 bg-gray-50 rounded-lg">
                    <div className="lg:col-span-3">
                        <input
                            type="text"
                            placeholder="Medicamento"
                            name="medication_name"
                            defaultValue={_item.medication_name}
                            onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                            className="input-field w-full"
                            disabled={onlyViewMode}
                        />
                        {errors?.prescription?.items?.[index]?.medication_name && <p className="text-red-500 text-sm">{errors.prescription.items[index].medication_name}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Dosis"
                            name="dosage"
                            defaultValue={_item.dosage}
                            className="input-field w-full"
                            onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                            disabled={onlyViewMode}
                        />
                        {errors?.prescription?.items?.[index]?.dosage && <p className="text-red-500 text-sm">{errors.prescription.items[index].dosage}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Frecuencia"
                            name="frequency"
                            defaultValue={_item.frequency}
                            className="input-field w-full"
                            onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                            disabled={onlyViewMode}
                        />
                        {errors?.prescription?.items?.[index]?.frequency && <p className="text-red-500 text-sm">{errors.prescription.items[index].frequency}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Duración"
                            name="duration"
                            defaultValue={_item.duration}
                            className="input-field w-full"
                            onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                            disabled={onlyViewMode}
                        />
                        {errors?.prescription?.items?.[index]?.duration && <p className="text-red-500 text-sm">{errors.prescription.items[index].duration}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Notas"
                            name="notes"
                            defaultValue={_item.notes}
                            className="input-field w-full"
                            onChange={(e) => onHandleChantePrescriptionItem(e, index)}
                            disabled={onlyViewMode}
                        />
                        {errors?.prescription?.items?.[index]?.notes && <p className="text-red-500 text-sm">{errors.prescription.items[index].notes}</p>}
                    </div>
                    <div className="lg:col-span-1 flex justify-center items-center">
                        {!onlyViewMode && index > 0 && onHandleRemoveItem ? (
                            <button type="button" onClick={() => onHandleRemoveItem(index)} className="btn-danger">
                                <TrashIcon />
                            </button>
                        ) : null}
                    </div>
                </div>
            ))}
        </>
    );
}