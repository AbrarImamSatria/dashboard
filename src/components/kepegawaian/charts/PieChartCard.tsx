import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface DataItem {
  name: string;
  value: number;
  percentage: string;
}

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}

interface PieChartCardProps {
  data: DataItem[];
  colors: string[];
}

const PieChartCard = ({ data, colors }: PieChartCardProps) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: LabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#000000"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={12}
        >
          {`${name} (${data[index].percentage}%)`}
        </text>
        <line
          x1={cx + outerRadius * 0.95 * Math.cos(-midAngle * RADIAN)}
          y1={cy + outerRadius * 0.95 * Math.sin(-midAngle * RADIAN)}
          x2={cx + outerRadius * 1.15 * Math.cos(-midAngle * RADIAN)}
          y2={cy + outerRadius * 1.15 * Math.sin(-midAngle * RADIAN)}
          stroke="#000000"
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 text-center">
        Perbandingan PNS dan PPPK
      </h2>
      <div className="flex justify-center">
        <PieChart width={350} height={280}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            labelLine={true}
            label={renderCustomizedLabel}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex justify-center space-x-8 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm">
              {item.name}: {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartCard;