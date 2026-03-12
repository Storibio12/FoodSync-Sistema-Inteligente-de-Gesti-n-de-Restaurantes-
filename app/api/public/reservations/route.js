import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

/**
 * POST: crear cliente y luego reserva (flujo público).
 * Body: { name, phone, email?, date, time, people_count, table_id? }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, date, time, people_count, table_id } = body;

    if (!name || !phone || !date || !time || people_count == null) {
      return NextResponse.json(
        { error: "Faltan datos requeridos: nombre, teléfono, fecha, hora y número de personas." },
        { status: 400 },
      );
    }

    // Clean phone to only digits for WhatsApp compatibility
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = "1" + cleanPhone; // Fallback to DR/US country code +1
    }

    if (cleanPhone.length < 11) {
      return NextResponse.json(
        { error: "Por favor, introduce un número de teléfono válido con código de área (ej. 809-XXX-XXXX)." },
        { status: 400 },
      );
    }

    const base = API_URL.replace(/\/$/, "");

    // 1. Crear cliente
    const clientRes = await fetch(`${base}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: cleanPhone }),
      cache: "no-store",
    });

    const clientText = await clientRes.text();
    let clientData;
    try {
      clientData = clientText ? JSON.parse(clientText) : {};
    } catch {
      return NextResponse.json(
        { error: "Error al crear el cliente. Intenta de nuevo." },
        { status: 502 },
      );
    }

    if (!clientRes.ok) {
      const msg = clientData.message || clientData.error || clientText || "Error al crear cliente";
      return NextResponse.json({ error: msg }, { status: clientRes.status });
    }

    const clientId = clientData?.data?.client?.client_id ?? clientData?.data?.client?.id ?? clientData?.client_id ?? clientData?.id;
    if (clientId == null) {
      return NextResponse.json(
        { error: "La API no devolvió el ID del cliente." },
        { status: 502 },
      );
    }

    // 2. Crear reserva
    const reservationBody = {
      client_id: Number(clientId),
      date: String(date),
      time: String(time),
      people_count: Number(people_count),
    };
    if (table_id != null && table_id !== "") {
      reservationBody.table_id = Number(table_id);
    }

    const resRes = await fetch(`${base}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationBody),
      cache: "no-store",
    });

    const resText = await resRes.text();
    let resData;
    try {
      resData = resText ? JSON.parse(resText) : {};
    } catch {
      return NextResponse.json(
        { error: "Error al crear la reserva. Intenta de nuevo." },
        { status: 502 },
      );
    }

    if (!resRes.ok) {
      const msg = resData.message || resData.error || resText || "Error al crear la reserva";
      return NextResponse.json({ error: msg }, { status: resRes.status });
    }

    return NextResponse.json(
      { success: true, message: "Reserva realizada correctamente." },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
