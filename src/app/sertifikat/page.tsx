import SertifikatPage from "../../components/Sertifikat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Sertifikat NIDI — PT Fortuna Solusi Group",
  description: "Cek keaslian dan unduh sertifikat NIDI instalasi listrik Anda secara online.",
};

export default function Page() {
  return <SertifikatPage />;
}