import DashboardAdmin from "../../../components/PricelistAdmin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Panel Admin NIDI SLO",
  description: "Ringkasan dan akses cepat panel admin NIDI SLO",
};

export default function Page() {
  return <DashboardAdmin />;
}