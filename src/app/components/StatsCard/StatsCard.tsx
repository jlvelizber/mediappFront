import { FC } from "react";
import { StatsCardInterface } from "./StatsCardInterface";

export const StatsCard: FC<StatsCardInterface> = ({ title, value, icon }) => {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        {icon && <div className="text-gray-400 text-3xl">{icon}</div>}
      </div>
    );
  };