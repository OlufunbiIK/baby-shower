// app/api/guests/route.ts
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = "15ewgjkz5cgGBJhSxiOjQ98mtPtv7VkkrXBufcj1Z9no";
const SHEET_ID = "1214079262";

export async function GET() {
  try {
    const timestamp = new Date().getTime();
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}&timestamp=${timestamp}`;
    
    console.log("Fetching from:", url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/csv,text/plain,*/*',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error("Fetch failed:", response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch data from Google Sheets' },
        { status: response.status }
      );
    }

    const csvText = await response.text();
    console.log("CSV fetched successfully, length:", csvText.length);
    
    return new NextResponse(csvText, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}