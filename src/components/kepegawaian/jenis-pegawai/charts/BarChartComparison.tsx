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

interface BarChartComparisonProps {
  data: any[];
  title: string;
  domain: number[];
  ticks: number[];
  barSize?: number;
  barDataKeys: string[];
  colors: string[];
  labels: string[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
}

const BarChartComparison = ({
  data,
  title,
  domain,
  ticks,
  barSize = 120,
  barDataKeys,
  colors,
  labels,
  width = 310,
  height = 250,
  margin = {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
}: BarChartComparisonProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full flex justify-center mt-11">
        <RechartsBarChart
          width={width}
          height={height}
          data={data}
          margin={margin}
          barSize={barSize}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            domain={domain}
            ticks={ticks}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          {barDataKeys.map((dataKey, index) => (
            <Bar 
              key={dataKey} 
              dataKey={dataKey} 
              fill={colors[index]} 
            />
          ))}
        </RechartsBarChart>
      </div>
      <div className="flex justify-center space-x-16 mt-2">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartComparison;