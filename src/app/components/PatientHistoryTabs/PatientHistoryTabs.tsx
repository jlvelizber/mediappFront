import { AppointmentWithMedicalRecord } from "@/app/intefaces";
import { useState } from "react";
import { Tabs } from "../Tabs";
import AppointmentsHistory from "./AppointmentsHistory";

interface PatientHistoryTabsProps {
    appointments?: AppointmentWithMedicalRecord[];
}

export default function PatientHistoryTabs({ appointments = [] }: PatientHistoryTabsProps) {
    const [activeTab, setActiveTab] = useState<"appointments" | "clinical" | "prescriptions">("appointments");
    
    return (
        <Tabs 
            active={activeTab} 
            tabs={[
                { label: "Citas", value: "appointments" },
            ]} 
            onChange={(value) => setActiveTab(value as "appointments" | "clinical" | "prescriptions")}
        >
            {activeTab === "appointments" && <AppointmentsHistory appointments={appointments} />}
        </Tabs>
    );
}