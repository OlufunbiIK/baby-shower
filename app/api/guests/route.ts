// app/api/guests/route.ts
import { NextResponse } from "next/server";

const SPREADSHEET_ID = "15ewgjkz5cgGBJhSxiOjQ98mtPtv7VkkrXBufcj1Z9no";
const SHEET_ID = "1214079262";

export async function GET() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

    const response = await fetch(url, {
      cache: "no-store", // 🔥 THIS is important
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Google Sheet" },
        { status: response.status }
      );
    }

    const csvText = await response.text();

    return new NextResponse(csvText, {
      headers: {
        "Content-Type": "text/csv",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
