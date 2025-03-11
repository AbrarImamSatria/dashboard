import React from "react";
import { FaLandmark, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CardItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface PieDataItem {
  name: string;
  value: number;
  percentage: string;
}

interface BarDataItem {
  name: string;
  value: number;
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

const PariwisataDashboard = () => {
  // Sample data for the dashboard
  const cardData: CardItem[] = [
    {
      label: "Total Wisata",
      value: "152",
      icon: <FaLandmark className="text-4xl text-teal-600" />
    },
    {
      label: "Total Pengunjung",
      value: "324,511",
      icon: <FaUsers className="text-4xl text-teal-600" />
    },
    {
      label: "Total Kecamatan",
      value: "17",
      icon: <FaMapMarkerAlt className="text-4xl text-teal-600" />
    }
  ];

  // Data for pie chart
  const pieData: PieDataItem[] = [
    { name: "Wisata Alam", value: 95, percentage: "55.3" },
    { name: "Wisata Buatan", value: 40, percentage: "23.7" },
    { name: "Desa Wisata", value: 35, percentage: "21.0" }
  ];
  const COLORS = ["#004d40", "#26a69a", "#80cbc4"];

  // Data for bar chart (wisata per kecamatan)
  const barDataKecamatan: BarDataItem[] = [
    { name: "Badungpanjang", value: 5 },
    { name: "Bayongbong", value: 7 },
    { name: "Bungbulang", value: 11 },
    { name: "Cibalong", value: 19 },
    { name: "Cikajang", value: 15 },
    { name: "Cilawu", value: 8 },
    { name: "Cisompet", value: 9 },
    { name: "Karangtengah", value: 6 },
    { name: "Pakenjeng", value: 8 },
    { name: "Pamulihan", value: 7 },
    { name: "Pasirwangi", value: 8 },
    { name: "Peundeuy", value: 10 },
    { name: "Sukaresmi", value: 4 }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Data for stacked bar chart (pengunjung per tahun)
  const yearlyVisitorData = [
    { name: "2010", "Desa Wisata": 2000, "Wisata Buatan": 5000, "Wisata Alam": 8000 },
    { name: "2011", "Desa Wisata": 2500, "Wisata Buatan": 5500, "Wisata Alam": 9000 },
    { name: "2012", "Desa Wisata": 2300, "Wisata Buatan": 6000, "Wisata Alam": 8700 },
    { name: "2013", "Desa Wisata": 2200, "Wisata Buatan": 5800, "Wisata Alam": 8500 },
    { name: "2014", "Desa Wisata": 2800, "Wisata Buatan": 6200, "Wisata Alam": 9100 },
    { name: "2015", "Desa Wisata": 2400, "Wisata Buatan": 6000, "Wisata Alam": 8600 },
    { name: "2016", "Desa Wisata": 2600, "Wisata Buatan": 6400, "Wisata Alam": 9000 },
    { name: "2017", "Desa Wisata": 10000, "Wisata Buatan": 20000, "Wisata Alam": 40000 },
    { name: "2018", "Desa Wisata": 9500, "Wisata Buatan": 19000, "Wisata Alam": 38500 },
    { name: "2019", "Desa Wisata": 9000, "Wisata Buatan": 18000, "Wisata Alam": 37000 },
    { name: "2020", "Desa Wisata": 1000, "Wisata Buatan": 2000, "Wisata Alam": 4000 },
    { name: "2021", "Desa Wisata": 3000, "Wisata Buatan": 6000, "Wisata Alam": 12000 },
    { name: "2022", "Desa Wisata": 5000, "Wisata Buatan": 10000, "Wisata Alam": 20000 },
    { name: "2023", "Desa Wisata": 10500, "Wisata Buatan": 21000, "Wisata Alam": 42500 }
  ];

  // Custom PieChart label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: LabelProps) => {
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
          {`${name} (${pieData[index].percentage}%)`}
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
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-md flex flex-col items-center justify-center h-24"
          >
            <div className="flex items-center justify-center">
              <div className="mr-3">{item.icon}</div>
              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-600 text-center">
                  {item.label}
                </div>
                <div className="text-xl font-bold text-center">
                  {item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row: Bar Chart and Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart: Jumlah Wisata Per-Kecamatan */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Jumlah Wisata Per-Kecamatan (2024)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={barDataKecamatan}
                margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 40]} />
                <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#26a69a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Jenis Wisata */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">Jenis Wisata</h2>
          <div className="w-full h-64 flex justify-center">
            <PieChart width={350} height={250}>
              <Pie
                data={pieData}
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
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex justify-center space-x-6 mt-2">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-xs">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row: Yearly Stacked Bar Chart */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Jumlah Pengunjung Per Tahun Berdasarkan Kategori Objek Wisata</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearlyVisitorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              stackOffset="sign"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(tick) => `${tick / 1000}k`} />
              <Tooltip formatter={(value) => {
                if (typeof value === 'number') {
                  return new Intl.NumberFormat('id-ID').format(value);
                }
                return value;
              }} />
              <Legend />
              <Bar dataKey="Desa Wisata" stackId="a" fill="#004d40" />
              <Bar dataKey="Wisata Buatan" stackId="a" fill="#26a69a" />
              <Bar dataKey="Wisata Alam" stackId="a" fill="#80cbc4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PariwisataDashboard;