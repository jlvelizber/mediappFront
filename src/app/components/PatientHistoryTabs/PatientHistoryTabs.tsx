
import { useState } from "react";
import { Tabs } from "../Tabs";

export default function PatientHistoryTabs () {
  const [activeTab, setActiveTab] = useState<"appointments" | "clinical" | "prescriptions">("appointments");
    return (
      <Tabs active={activeTab} tabs={[
        { label: "Citas", value: "appointments" },
        { label: "Historias Clínicas", value: "clinical" },
        { label: "Prescripciones", value: "prescriptions" },
      ]} onChange={(value) => setActiveTab(value as "appointments" | "clinical" | "prescriptions")}>


        {activeTab === "appointments" && <h1>Citas</h1>}
        {activeTab === "clinical" && <h1>Historias Clínicas</h1>}
        {activeTab === "prescriptions" && <h1>Prescripciones</h1>}
      </Tabs>
    );
}