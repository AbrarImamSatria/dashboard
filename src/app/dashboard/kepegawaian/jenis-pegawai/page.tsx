"use client"; 
import React from "react";
import MenuASN from "@/components/kepegawaian/home/MenuAsn";
import JudulHalaman from "@/components/kepegawaian/jenis-pegawai/JudulHalaman";
import CombinedDetailDashboard from "@/components/kepegawaian/jenis-pegawai/CombinedDetailDashboard";
import Breadcrumb from "@/components/dashboard/breadcrumb";

export default function HalamanASN() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuASN />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb /> 
        <JudulHalaman /> 
      </div>
      <div className="pb-9">
        <CombinedDetailDashboard />
      </div>
    </div>
  );
}