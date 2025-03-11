"use client";
import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { fetchKepegawaianData } from "@/services/kepegawaian/jenisPegawai";
import DashboardCards from "./DashboardCards";
import DetailFormasiPanel from "./DetailFormasiPanel";
import PieChartComparison from "./charts/PieChartComparison";
import BarChartComparison from "./charts/BarChartComparison";
import DistribusiBarChart from "./charts/DistribusiBarChart";

// Color constants
const COLORS = ["#004d40", "#80cbc4"];
const HEALTH_COLORS = ["#004d40", "#26a69a", "#80cbc4", "#b2dfdb"];
const TECH_COLORS = ["#004d40", "#00796b", "#4db6ac", "#80cbc4"];

const CombinedDetailDashboard = () => {
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

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Baris pertama: Dashboard Cards (3 kartu) */}
      <DashboardCards cardData={cardData} columns={3} />

      {/* Detail Formasi Panel */}
      <DetailFormasiPanel detailFormasi={data.detailFormasi} />

      {/* Baris kedua: PieChart dan BarChart (2 kartu) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card untuk PieChart */}
        <PieChartComparison 
          data={formattedData} 
          colors={COLORS} 
          title="Perbandingan PNS dan PPPK" 
        />

        {/* Card untuk BarChart */}
        <BarChartComparison 
          data={data.perbandinganKebutuhanDanAktual}
          title="Perbandingan Kebutuhan dan Aktual ASN" 
          domain={[0, 10000]}
          ticks={[0, 2500, 5000, 7500, 10000]}
          barDataKeys={["ASN saat ini", "Total Kebutuhan"]}
          colors={["#80cbc4", "#004d40"]}
          labels={["ASN saat ini", "Total Kebutuhan"]}
        />
      </div>

      {/* Baris ketiga: 2 kartu baru untuk bar chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card untuk Distribusi Kebutuhan Tenaga Kesehatan */}
        <DistribusiBarChart 
          data={data.distribusiKebutuhanTenagaKesehatan}
          title="Distribusi Kebutuhan Tenaga Kesehatan"
          color="#004d40"
          label="Jumlah Kebutuhan"
        />

        {/* Card untuk Distribusi Kebutuhan Tenaga Teknis */}
        <DistribusiBarChart 
          data={data.distribusiKebutuhanTenagaTeknis}
          title="Distribusi Kebutuhan Tenaga Teknis"
          color="#80cbc4"
          label="Tenaga Teknis"
        />
      </div>
    </div>
  );
};

export default CombinedDetailDashboard;