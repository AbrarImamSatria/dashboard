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
import { DataUsiaPendidikan } from "@/components/kepegawaian/distribusi-asn/kepegawaian";

interface GrafikUsiaProps {
  distribusiUsia: DataUsiaPendidikan[];
}

const GrafikUsia: React.FC<GrafikUsiaProps> = ({ distribusiUsia }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Distribusi ASN Berdasarkan Usia
      </h2>
      <RechartsBarChart
        width={460}
        height={300}
        data={distribusiUsia}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="nama" interval={0} /> {/* Interval diatur ke 0 */}
        <YAxis />
        <Tooltip />
        <Bar dataKey="nilai" fill="#80cbc4" />
      </RechartsBarChart>
      {/* Legenda untuk Distribusi ASN Berdasarkan Usia */}
      <div className="flex justify-center space-x-16 mt-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#80cbc4" }}
          />
          <span className="text-sm">Kelompok Usia</span>
        </div>
      </div>
    </div>
  );
};

export default GrafikUsia;