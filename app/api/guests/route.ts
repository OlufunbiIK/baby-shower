// app/api/guests/route.ts
import { NextResponse } from "next/server";

const SPREADSHEET_ID = "15ewgjkz5cgGBJhSxiOjQ98mtPtv7VkkrXBufcj1Z9no";
const SHEET_ID = "1214079262";

export async function GET() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;
    
    console.log("Fetching from:", url);

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Failed to fetch sheet:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch Google Sheet" },
        { status: response.status }
      );
    }

    const csvText = await response.text();
    console.log("CSV length:", csvText.length);
    console.log("CSV preview:", csvText.slice(0, 200));

    return new NextResponse(csvText, {
      headers: {
        "Content-Type": "text/csv",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Failed to fetch sheet:", err);
    return NextResponse.json(
      { error: "Server error", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;