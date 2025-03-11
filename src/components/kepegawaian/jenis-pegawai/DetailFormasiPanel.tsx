import React from "react";

interface DetailFormasiProps {
  detailFormasi: {
    tenagaKesehatan: {
      total: number;
      keterangan: string;
    };
    tenagaTeknis: {
      total: number;
      keterangan: string;
    };
  };
}

const DetailFormasiPanel = ({ detailFormasi }: DetailFormasiProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      {/* Judul tetap di kiri */}
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Detail Formasi yang dibutuhkan
      </h3>

      {/* Konten card di tengah */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-white p-4 rounded flex-1 min-w-48 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">
            Tenaga Kesehatan
          </p>
          <p className="text-3xl font-bold mb-1">
            {detailFormasi.tenagaKesehatan.total}
          </p>
          <p className="text-xs text-gray-500">
            {detailFormasi.tenagaKesehatan.keterangan}
          </p>
        </div>
        <div className="bg-white p-4 rounded flex-1 min-w-48 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">
            Tenaga Teknis
          </p>
          <p className="text-3xl font-bold mb-1">
            {detailFormasi.tenagaTeknis.total}
          </p>
          <p className="text-xs text-gray-500">
            {detailFormasi.tenagaTeknis.keterangan}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailFormasiPanel;