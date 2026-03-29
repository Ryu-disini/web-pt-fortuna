export default function Footer() {
  return (
    <footer className="bg-[#0b1222] text-white pt-20 border-t-8 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">

          {/* Branding */}
          <div className="space-y-7">

            <div className="flex items-center gap-4">
              
              {/* Logo */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-20"></div>
                <div className="relative bg-white p-1 rounded-full overflow-hidden w-20 h-20 border-2 border-blue-900 shadow-2xl">
                  <img 
                    src="/images/LogoPT.png"
                    alt="Logo PT Fortuna Solusi Group"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Nama PT */}
              <div>
                <h2 className="text-xl font-black leading-tight uppercase text-white">
                  PT Fortuna Solusi Group
                </h2>
                <p className="text-yellow-400 text-sm font-semibold tracking-wide">
                  Electrical Contractor
                </p>
              </div>
            </div>
              <br />
              <br />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Mitra strategis pembangunan infrastruktur kelistrikan. Kami membantu
              pengurusan NIDI dengan standar keamanan tinggi di seluruh
              wilayah Indonesia.
            </p>
              <br />
              <br />
            {/* Social Media */}
            

          </div>


          {/* Layanan */}
          {/* <div className="space-y-6">

            <h3 className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
              Layanan
            </h3>
              <br />
              <br />
            <nav className="grid gap-4 text-slate-300 text-sm">

              {[
                "Instalasi Listrik",
                "Pengurusan NIDI",
                "Sertifikasi SLO",
                "Maintenance"
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex items-center gap-3 hover:text-yellow-400 transition"
                >
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  {item}
                </a>
              ))}

            </nav>

          </div> */}


          {/* Kantor + Map */}
          <div className="space-y-6">

            <h3 className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
              Kantor Wilayah Jabar
            </h3>
              <br />
            <div className="bg-[#1e293b]/40 border border-slate-800 p-5 rounded-2xl space-y-4 hover:border-yellow-400/40 transition">

              <div>
                <p className="font-semibold text-white text-sm">
                  Bogor, Jawa Barat
                </p>
                <p className="text-slate-500 text-xs italic">
                  -6.592335, 106.744880
                </p>
              </div>

              <div className="h-32 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition duration-700">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  src="https://maps.google.com/maps?q=-6.592335,106.744880&z=15&output=embed"
                ></iframe>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PT Fortuna Solusi Group. All rights reserved.
      </div>

    </footer>
  );
}