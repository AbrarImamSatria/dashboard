"use client";
import React, { useState, useEffect } from "react";
import { getDistribusiAsn } from "@/services/kepegawaian/distribusiAsn";
import { ApiData } from "@/components/kepegawaian/distribusi-asn/kepegawaian";
import GrafikJenisKelamin from "@/components/kepegawaian/distribusi-asn/charts/GrafikJenisKelamin";
import GrafikUsia from "@/components/kepegawaian/distribusi-asn/charts/GrafikUsia";
import GrafikPendidikan from "@/components/kepegawaian/distribusi-asn/charts/GrafikPendidikan";

const Dashboard = () => {
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
      {/* Grafik Jenis Kelamin */}
      <GrafikJenisKelamin distribusiJenisKelamin={distribusiJenisKelamin} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Grafik Usia */}
        <GrafikUsia distribusiUsia={distribusiUsia} />

        {/* Grafik Pendidikan */}
        <GrafikPendidikan distribusiPendidikan={distribusiPendidikan} />
      </div>
    </div>
  );
};

export default Dashboard;