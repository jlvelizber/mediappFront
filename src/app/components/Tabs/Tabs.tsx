import { useState } from "react";
import { TabsProps } from "./TabsIComponentnterface";

export default function Tabs({ tabs, active, onChange, children }: TabsProps) {
    const [selected, setSelected] = useState<string>(active || tabs[0]?.value);

    const handleTabClick = (value: string) => {
        setSelected(value);
        onChange?.(value);
    };

    return (
        <>
            <div className="flex gap-4 border-b border-gray-200 mb-4 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleTabClick(tab.value)}
                        className={`pb-2 whitespace-nowrap text-sm font-medium transition ${(active ?? selected) === tab.value
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.icon && <span className="inline-block mr-1">{tab.icon}</span>}
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>{children}</div>
        </>
    );
}