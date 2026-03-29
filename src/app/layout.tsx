import "./globals.css";
import LayoutClient from "../components/LayoutClient";

export const metadata = {
  title: "Jasa Instalasi NIDI & SLO",
  description: "Perusahaan jasa instalasi listrik, NIDI dan SLO terpercaya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}