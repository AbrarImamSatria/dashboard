"use client";
import React from "react";
import MenuASN from "@/components/kepegawaian/home/MenuAsn";
import CombinedDashboard from "@/components/kepegawaian/home/CombinedDashboard";

export default function ASNPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuASN />
      <div className="pb-9 pt-3">
        <CombinedDashboard />
      </div>
    </div>
  );
}
