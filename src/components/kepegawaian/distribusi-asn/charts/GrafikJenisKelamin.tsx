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
import { JenisKelamin } from "@/components/kepegawaian/distribusi-asn/kepegawaian";

interface GrafikJenisKelaminProps {
  distribusiJenisKelamin: JenisKelamin[];
}

const GrafikJenisKelamin: React.FC<GrafikJenisKelaminProps> = ({
  distribusiJenisKelamin,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-left">
        Distribusi ASN Berdasarkan Jenis Kelamin
      </h2>
      <div className="flex flex-col md:flex-row items-start">
        {/* Bagian Grafik */}
        <div className="w-full md:w-3/5">
          <RechartsBarChart
            width={500}
            height={300}
            data={distribusiJenisKelamin}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="nama" />
            <YAxis
              domain={[
                0,
                Math.max(
                  ...distribusiJenisKelamin.map((d) =>
                    Math.max(d.Perempuan, d["Laki-laki"])
                  )
                ) * 1.2,
              ]}
              ticks={[0, 500, 1000, 1500, 2000]}
            />
            <Tooltip />
            <Bar dataKey="Perempuan" fill="#80cbc4" />
            <Bar dataKey="Laki-laki" fill="#004d40" />
          </RechartsBarChart>
        </div>

        {/* Panel legenda dan informasi */}
        <div className="w-full md:w-2/5 pl-4 flex flex-col gap-4">
          {/* Legenda diubah ke tengah */}
          <div className="flex items-center mb-2 justify-center">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 rounded-full bg-teal-400 mr-2"></div>
              <span className="text-sm text-center">Perempuan</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-teal-800 mr-2"></div>
              <span className="text-sm text-center">Laki-laki</span>
            </div>
          </div>

          {/* Panel informasi untuk setiap jenis pegawai */}
          {distribusiJenisKelamin.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-md p-3 w-3/4 mx-auto"
            >
              <div className="font-bold">{item.nama}</div>
              <div className="text-sm">
                Laki-laki: {item["Laki-laki"].toLocaleString()} (
                {item.persentaseLaki}%)
              </div>
              <div className="text-sm">
                Perempuan: {item.Perempuan.toLocaleString()} (
                {item.persentasePerempuan}%)
              </div>
              <div className="text-sm">Total: {item.total.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrafikJenisKelamin;