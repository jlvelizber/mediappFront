import { FC } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppointmentsChartProps } from "./AppointmentsChartInterface";


export const AppointmentsChart: FC<AppointmentsChartProps> = ({ data }) => {
    const chartData = data && Array.isArray(data) ? data : [];
    
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Citas por semana</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-500">
            No hay datos disponibles
          </div>
        )}
      </div>
    );
  };