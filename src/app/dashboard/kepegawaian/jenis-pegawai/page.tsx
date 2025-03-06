"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { fetchKepegawaianData } from "@/services/kepegawaian/jenisPegawai";

// Define interfaces for type safety
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

// Color constants
const COLORS = ["#004d40", "#80cbc4"];
const HEALTH_COLORS = ["#004d40", "#26a69a", "#80cbc4", "#b2dfdb"];
const TECH_COLORS = ["#004d40", "#00796b", "#4db6ac", "#80cbc4"];

// Komponen judul halaman
const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">Detail Jenis Pegawai</h1>
    </div>
  );
};

// Navigation Menu Component
const MenuASN = () => {
  const router = useRouter();
  const itemMenu: { ikon: ReactElement; label: string; path: string }[] = [
    {
      ikon: <FaChartPie size={24} />,
      label: "Distribusi ASN",
      path: "/dashboard/kepegawaian/distribusi-asn",
    },
    {
      ikon: <FaUsers size={24} />,
      label: "Jenis Pegawai",
      path: "/dashboard/kepegawaian/jenis-pegawai",
    },
  ];

  const handlerNavigasi = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex justify-center bg-gray-100 p-3 space-x-8">
      {itemMenu.map((item, index) => (
        <div
          key={index}
          className="flex items-center text-black space-x-2 cursor-pointer"
          onClick={() => handlerNavigasi(item.path)}
        >
          {item.ikon}
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Combined Dashboard Component
const CombinedDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const apiData = await fetchKepegawaianData();
        setData(apiData);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Data untuk 3 card di bagian atas
  const cardData = [
    {
      label: "Total Formasi",
      value: data.summaryStats.totalFormasi.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Total ASN Saat Ini",
      value: data.summaryStats.totalASN.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Kekurangan",
      value: data.summaryStats.kekurangan.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
  ];

  // Prepare data for PieChart
  const formattedData = data.perbandinganPNSdanPPPK.map((item: any) => ({
    ...item,
    value: Number(item.value),
  }));

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
          {`${formattedData[index].name} (${formattedData[index].percentage}%)`}
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
      {/* Baris pertama: Dashboard Cards (3 kartu) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cardData.map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-md flex flex-col items-center justify-center h-24"
          >
            {/* Konten rata tengah */}
            <div className="flex items-center justify-center">
              {/* Ikon */}
              <div className="mr-3">{item.icon}</div>
              {/* Teks */}
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

      {/* Detail Formasi Panel */}
      <div className="bg-gray-100 p-4 rounded shadow">
        {/* Judul tetap di kiri */}
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Detail Formasi yang dibutuhkan
        </h3>

        {/* Konten card di tengah */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="bg-white p-4 rounded flex-1 min-w-48 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Tenaga Kesehatan
            </p>
            <p className="text-3xl font-bold mb-1">
              {data.detailFormasi.tenagaKesehatan.total}
            </p>
            <p className="text-xs text-gray-500">
              {data.detailFormasi.tenagaKesehatan.keterangan}
            </p>
          </div>
          <div className="bg-white p-4 rounded flex-1 min-w-48 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Tenaga Teknis
            </p>
            <p className="text-3xl font-bold mb-1">
              {data.detailFormasi.tenagaTeknis.total}
            </p>
            <p className="text-xs text-gray-500">
              {data.detailFormasi.tenagaTeknis.keterangan}
            </p>
          </div>
        </div>
      </div>

      {/* Baris kedua: PieChart dan BarChart (2 kartu) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card untuk PieChart */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-6 text-center">
            Perbandingan PNS dan PPPK
          </h2>
          <div className="flex justify-center">
            <PieChart width={350} height={280}>
              <Pie
                data={formattedData}
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
                {formattedData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex justify-center space-x-8 mt-4">
            {formattedData.map((item: any, index: number) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm">
                  {item.name}: {item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card untuk BarChart */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">
            Perbandingan Kebutuhan dan Aktual ASN
          </h2>
          <div className="w-full flex justify-center mt-11">
            <RechartsBarChart
              width={310}
              height={250}
              data={data.perbandinganKebutuhanDanAktual}
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
                domain={[0, 10000]}
                ticks={[0, 2500, 5000, 7500, 10000]}
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
      </div>

      {/* Baris ketiga: 2 kartu baru untuk bar chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card untuk Distribusi Kebutuhan Tenaga Kesehatan */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">
            Distribusi Kebutuhan Tenaga Kesehatan
          </h2>
          <div className="w-full flex justify-start pl-4">
            <RechartsBarChart
              width={450}
              height={280}
              data={data.distribusiKebutuhanTenagaKesehatan}
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
              <Bar name="Jumlah" dataKey="jumlah" fill="#004d40" />
            </RechartsBarChart>
          </div>
          <div className="flex justify-start pl-4 mt-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#004d40" }}
              />
              <span className="text-sm">Jumlah Kebutuhan</span>
            </div>
          </div>
        </div>

        {/* Card untuk Distribusi Kebutuhan Tenaga Teknis */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">
            Distribusi Kebutuhan Tenaga Teknis
          </h2>
          <div className="w-full flex justify-start pl-4">
            <RechartsBarChart
              width={450}
              height={280}
              data={data.distribusiKebutuhanTenagaTeknis}
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
              <Bar name="Jumlah" dataKey="jumlah" fill="#80cbc4" />
            </RechartsBarChart>
          </div>
          <div className="flex justify-start pl-4 mt-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#80cbc4" }}
              />
              <span className="text-sm">Tenaga Teknis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const HalamanASN = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuASN />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb /> {/* Menggunakan komponen breadcrumb dinamis */}
        <JudulHalaman /> {/* Menambahkan judul halaman */}
      </div>
      <div className="pb-9">
        <CombinedDashboard />
      </div>
    </div>
  );
};

export default HalamanASN;
