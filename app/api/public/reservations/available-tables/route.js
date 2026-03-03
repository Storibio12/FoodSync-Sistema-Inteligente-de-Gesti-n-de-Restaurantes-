import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const peopleCount = searchParams.get("people_count");

    if (!date || !time || !peopleCount) {
      return NextResponse.json(
        { error: "Missing required query parameters: date, time, people_count" },
        { status: 400 },
      );
    }

    const base = API_URL.replace(/\/$/, "");
    const target = new URL(`${base}/reservations/available-tables`);
    target.searchParams.set("date", date);
    target.searchParams.set("time", time);
    target.searchParams.set("people_count", peopleCount);

    const res = await fetch(target.toString(), { cache: "no-store" });
    const status = res.status;
    const text = await res.text();

    if (!text) {
      return NextResponse.json({ error: "Empty response from API" }, { status: status || 502 });
    }

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status });
    } catch {
      // Respuesta no JSON (poco probable), devolver como error genérico
      return NextResponse.json(
        { error: text || "Unexpected response from API" },
        { status: status || 502 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching available tables" },
      { status: 500 },
    );
  }
}

