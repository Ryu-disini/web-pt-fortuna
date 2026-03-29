import Link from "next/link";

export default function ServiceCard({ title, link, children }: any) {
  return (
    <div className="bg-white border rounded-xl shadow hover:shadow-lg p-8 text-center transition">

      <div className="flex justify-center mb-6">
        {children}
      </div>

      <h3 className="font-semibold mb-4">{title}</h3>

      <Link
        href={link}
        className="text-blue-600 font-semibold hover:underline"
      >
        Lihat
      </Link>

    </div>
  );
}