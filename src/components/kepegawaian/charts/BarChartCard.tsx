import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface BarChartCardProps {
  data: any[];
  title: string;
  yMax: number;
  ticks: number[];
}

const BarChartCard = ({ data, title, yMax, ticks }: BarChartCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full flex justify-center mt-11">
        <RechartsBarChart
          width={310}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={120}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, yMax]}
            ticks={ticks}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Bar dataKey="ASN saat ini" fill="#80cbc4" />
          <Bar dataKey="Total Kebutuhan" fill="#004d40" />
        </RechartsBarChart>
      </div>
      <div className="flex justify-center space-x-16 mt-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#80cbc4" }}
          />
          <span className="text-sm">ASN saat ini</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#004d40" }}
          />
          <span className="text-sm">Total Kebutuhan</span>
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;