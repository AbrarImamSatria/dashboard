"use client";
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DistribusiBarChartProps {
  data: any[];
  title: string;
  color: string;
  label: string;
  dataKey?: string;
  width?: number;
  height?: number;
}

const DistribusiBarChart = ({
  data,
  title,
  color,
  label,
  dataKey = "jumlah",
  width = 450,
  height = 280,
}: DistribusiBarChartProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full flex justify-start pl-4">
        <RechartsBarChart
          width={width}
          height={height}
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 10,
            bottom: 5,
          }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar name={label} dataKey={dataKey} fill={color} />
        </RechartsBarChart>
      </div>
      <div className="flex justify-start pl-4 mt-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default DistribusiBarChart;