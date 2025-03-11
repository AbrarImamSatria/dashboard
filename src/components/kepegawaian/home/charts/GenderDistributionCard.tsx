import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface GenderData {
  pns: {
    laki_laki: number;
    perempuan: number;
  };
  pppk: {
    laki_laki: number;
    perempuan: number;
  };
}

interface GenderDistributionCardProps {
  data: any[];
  genderData: GenderData;
  yMax: number;
  ticks: number[];
}

const GenderDistributionCard = ({
  data,
  genderData,
  yMax,
  ticks,
}: GenderDistributionCardProps) => {
  // Calculate totals and percentages
  const pnsTotal = genderData.pns.perempuan + genderData.pns.laki_laki;
  const pppkTotal = genderData.pppk.perempuan + genderData.pppk.laki_laki;

  const pnsMalePercent = (
    (genderData.pns.laki_laki / pnsTotal) *
    100
  ).toFixed(2);
  const pnsFemalePercent = (
    (genderData.pns.perempuan / pnsTotal) *
    100
  ).toFixed(2);
  const pppkMalePercent = (
    (genderData.pppk.laki_laki / pppkTotal) *
    100
  ).toFixed(2);
  const pppkFemalePercent = (
    (genderData.pppk.perempuan / pppkTotal) *
    100
  ).toFixed(2);

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-left">
        Distribusi ASN Berdasarkan Jenis Kelamin
      </h2>
      <div className="flex flex-col md:flex-row items-start">
        {/* Chart section */}
        <div className="w-full md:w-3/5">
          <RechartsBarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, yMax]} ticks={ticks} />
            <Tooltip />
            <Bar dataKey="Perempuan" fill="#80cbc4" />
            <Bar dataKey="Laki-laki" fill="#004d40" />
          </RechartsBarChart>
        </div>

        {/* Legend and info panels */}
        <div className="w-full md:w-2/5 pl-4 flex flex-col gap-4">
          {/* Legend diubah ke tengah */}
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

          {/* PNS Panel */}
          <div className="bg-gray-100 rounded-md p-3 w-3/4 mx-auto">
            <div className="font-bold">PNS</div>
            <div className="text-sm">
              Laki-laki: {genderData.pns.laki_laki.toLocaleString()}{" "}
              ({pnsMalePercent}%)
            </div>
            <div className="text-sm">
              Perempuan: {genderData.pns.perempuan.toLocaleString()}{" "}
              ({pnsFemalePercent}%)
            </div>
            <div className="text-sm">Total: {pnsTotal.toLocaleString()}</div>
          </div>

          {/* PPPK Panel */}
          <div className="bg-gray-100 rounded-md p-3 w-3/4 mx-auto">
            <div className="font-bold">PPPK</div>
            <div className="text-sm">
              Laki-laki: {genderData.pppk.laki_laki.toLocaleString()}{" "}
              ({pppkMalePercent}%)
            </div>
            <div className="text-sm">
              Perempuan: {genderData.pppk.perempuan.toLocaleString()}{" "}
              ({pppkFemalePercent}%)
            </div>
            <div className="text-sm">Total: {pppkTotal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderDistributionCard;