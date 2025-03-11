"use client";
import React from "react";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import MenuASN from "@/components/kepegawaian/home/MenuAsn";
import JudulHalaman from "@/components/kepegawaian/distribusi-asn/JudulHalaman";
import Dashboard from "@/components/kepegawaian/distribusi-asn/dashboard";

export default function HalamanASN() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuASN />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb /> 
        <JudulHalaman />
      </div>
      <div className="pb-9">
        <Dashboard />
      </div>
    </div>
  );
}
