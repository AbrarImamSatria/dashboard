// Mendefinisikan interface untuk keamanan tipe
export interface JenisKelamin {
  nama: string;
  Perempuan: number;
  "Laki-laki": number;
  total: number;
  persentasePerempuan: string;
  persentaseLaki: string;
}

export interface DataUsiaPendidikan {
  nama: string;
  nilai: number;
}

export interface JenisKelaminTotal {
  "Laki-laki": number;
  Perempuan: number;
  persentaseLaki: string;
  persentasePerempuan: string;
}

export interface Summary {
  totalASN: number;
  totalPNS: number;
  totalPPPK: number;
  persentasePNS: string;
  persentasePPPK: string;
  distribusiJenisKelaminTotal: JenisKelaminTotal;
}

export interface ApiData {
  distribusiJenisKelamin: JenisKelamin[];
  distribusiUsia: DataUsiaPendidikan[];
  distribusiPendidikan: DataUsiaPendidikan[];
  summary: Summary;
}

export interface PropsLabel {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  nama: string;
}

export const WARNA = ["#004d40", "#80cbc4"];