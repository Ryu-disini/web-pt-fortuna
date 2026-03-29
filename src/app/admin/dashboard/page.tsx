import DashboardAdmin from "../../../components/DashboardAdmin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Panel Admin PT FORTUNA SOLUSI GROUP",
  description: "Ringkasan dan akses cepat panel admin NIDI",
};

export default function Page() {
  return <DashboardAdmin />;
}