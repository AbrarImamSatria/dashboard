"use client";
import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { getHomeKepegawaianData } from "@/services/kepegawaian/homeKepegawaian.js";
import DashboardCards from "./DashboardCards";
import PieChartCard from "./charts/PieChartCard";
import BarChartCard from "./charts/BarChartCard";
import GenderDistributionCard from "./charts/GenderDistributionCard";

const COLORS = ["#004d40", "#80cbc4"];

const CombinedDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getHomeKepegawaianData();
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil data dari API");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error: {error || "Data tidak tersedia"}
        </div>
      </div>
    );
  }

  // Prepare data for PieChart from API
  const pieData = [
    { name: "PNS", value: dashboardData.jumlah_pns },
    { name: "PPPK", value: dashboardData.jumlah_pppk },
  ];

  const total = pieData.reduce((acc, item) => acc + item.value, 0);
  const formattedPieData = pieData.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  // Prepare data for BarChart from API
  const barData = [
    {
      name: "Perbandingan Jumlah ASN",
      "ASN saat ini":
        dashboardData.perbandingan_kebutuhan_dan_aktual_asn.aktual,
      "Total Kebutuhan":
        dashboardData.perbandingan_kebutuhan_dan_aktual_asn.kebutuhan,
    },
  ];

  // Prepare data for Gender distribution from API
  const genderData = [
    {
      name: "PNS",
      Perempuan:
        dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.perempuan,
      "Laki-laki":
        dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.laki_laki,
    },
    {
      name: "PPPK",
      Perempuan:
        dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.perempuan,
      "Laki-laki":
        dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.laki_laki,
    },
  ];
  
  // Data untuk Dashboard Cards dari API
  const cardData = [
    {
      label: "Total ASN",
      value: dashboardData.total_asn.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Jumlah PNS",
      value: dashboardData.jumlah_pns.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Jumlah PPPK",
      value: dashboardData.jumlah_pppk.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Kebutuhan ASN",
      value: dashboardData.kebutuhan_asn.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
  ];

  // Calculate max value for Y axis in gender chart
  const genderYMax = Math.max(
    dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.perempuan,
    dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.laki_laki,
    dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.perempuan,
    dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.laki_laki
  ) * 1.2;

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Baris pertama: Dashboard Cards */}
      <DashboardCards cardData={cardData} />

      {/* Baris kedua: PieChart dan BarChart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PieChartCard data={formattedPieData} colors={COLORS} />
        <BarChartCard 
          data={barData} 
          title="Perbandingan Kebutuhan dan Aktual ASN" 
          yMax={Math.ceil(dashboardData.kebutuhan_asn / 1000) * 1000}
          ticks={[0, 2500, 5000, 7500, 10000]}
        />
      </div>

      {/* Baris ketiga: Gender Distribution */}
      <GenderDistributionCard 
        data={genderData} 
        genderData={dashboardData.distribusi_asn_berdasarkan_jenis_kelamin}
        yMax={genderYMax}
        ticks={[0, 500, 1000, 1500, 2000]}
      />
    </div>
  );
};

export default CombinedDashboard;