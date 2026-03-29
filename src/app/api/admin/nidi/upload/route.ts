import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nidiNumber, ownerName, buildingType, capacity, image } = body;

    if (!nidiNumber || !image) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // Lokasi file JSON untuk simpan data
    const filePath = path.join(process.cwd(), "data", "db.json");
    const folderPath = path.join(process.cwd(), "data");

    // Buat folder 'data' kalau belum ada
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Baca data lama
    let nidiList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      nidiList = JSON.parse(fileData);
    }

    // Cek kalau nomor NIDI sudah ada
    if (nidiList.find((item: any) => item.nidiNumber === nidiNumber)) {
      return NextResponse.json({ error: "Nomor NIDI sudah terdaftar!" }, { status: 400 });
    }

    // Tambah data baru
    const newData = {
      id: Date.now().toString(),
      nidiNumber: nidiNumber.toUpperCase(),
      ownerName,
      buildingType: buildingType || "-",
      capacity: capacity || "-",
      fileUrl: image, // Base64 image
      status: "Laik Operasi",
      createdAt: new Date().toISOString(),
    };

    nidiList.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(nidiList, null, 2));

    return NextResponse.json({ success: true, data: newData }, { status: 201 });
  } catch (error: any) {
    console.error("FS_ERROR:", error);
    return NextResponse.json({ error: "Gagal simpan: " + error.message }, { status: 500 });
  }
}