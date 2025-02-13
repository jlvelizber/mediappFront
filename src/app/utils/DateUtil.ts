import { DaysWeekEnum } from "../Enums/DaysWeekEnum";

export const DateUtil = {
    getDaysOfWeekAsObject() {
        return Object.entries(DaysWeekEnum).map(([key, value], index) => ({ id: index, value: key.toLowerCase(), label: value.charAt(0).toUpperCase() + value.slice(1) }));
    }
}