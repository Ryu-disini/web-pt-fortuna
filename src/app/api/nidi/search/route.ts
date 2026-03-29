import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number")?.toUpperCase();

    const filePath = path.join(process.cwd(), "data", "db.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Belum ada data" }, { status: 404 });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const nidiList = JSON.parse(fileData);

    const found = nidiList.find((item: any) => item.nidiNumber === number);

    if (!found) {
      return NextResponse.json({ error: "NIDI tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(found);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}