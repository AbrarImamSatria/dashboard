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
import { FaChartPie, FaUsers, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { getDistribusiAsn } from "@/services/kepegawaian/distribusiAsn";

// Mendefinisikan interface untuk keamanan tipe
interface JenisKelamin {
  nama: string;
  Perempuan: number;
  "Laki-laki": number;
  total: number;
  persentasePerempuan: string;
  persentaseLaki: string;
}

interface DataUsiaPendidikan {
  nama: string;
  nilai: number;
}

interface JenisKelaminTotal {
  "Laki-laki": number;
  Perempuan: number;
  persentaseLaki: string;
  persentasePerempuan: string;
}

interface Summary {
  totalASN: number;
  totalPNS: number;
  totalPPPK: number;
  persentasePNS: string;
  persentasePPPK: string;
  distribusiJenisKelaminTotal: JenisKelaminTotal;
}

interface ApiData {
  distribusiJenisKelamin: JenisKelamin[];
  distribusiUsia: DataUsiaPendidikan[];
  distribusiPendidikan: DataUsiaPendidikan[];
  summary: Summary;
}

interface PropsLabel {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  nama: string;
}

const WARNA = ["#004d40", "#80cbc4"];

// Komponen judul halaman
const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Detail Distribusi ASN
      </h1>
    </div>
  );
};

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

const DashboardGabungan = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getDistribusiAsn();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );

  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!data) return <div className="text-center p-8">No data available</div>;

  // Destructure data dari response API
  const {
    distribusiJenisKelamin,
    distribusiUsia,
    distribusiPendidikan,
    summary,
  } = data;

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Baris pertama: Distribusi ASN berdasarkan jenis kelamin */}
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
                <div className="text-sm">
                  Total: {item.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kartu untuk Distribusi ASN berdasarkan usia */}
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

        {/* Kartu untuk Distribusi ASN berdasarkan pendidikan */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Distribusi ASN Berdasarkan Pendidikan
          </h2>
          <RechartsBarChart
            width={460}
            height={300}
            data={distribusiPendidikan}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="nama" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="nilai" fill="#004d40" />
          </RechartsBarChart>
          {/* Legenda untuk Distribusi ASN Berdasarkan Pendidikan */}
          <div className="flex justify-center space-x-16 mt-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#004d40" }}
              />
              <span className="text-sm">Pendidikan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HalamanASN() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuASN />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb /> {/* Menggunakan komponen breadcrumb dinamis */}
        <JudulHalaman />
      </div>
      <div className="pb-9">
        <DashboardGabungan />
      </div>
    </div>
  );
}
