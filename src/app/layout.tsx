import "./globals.css";
import LayoutClient from "../components/LayoutClient";

export const metadata = {
  title: "PT Fortuna Solusi Group.",
  description: "Perusahaan jasa instalasi listrik dan penerbitan NIDI terpercaya.",
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