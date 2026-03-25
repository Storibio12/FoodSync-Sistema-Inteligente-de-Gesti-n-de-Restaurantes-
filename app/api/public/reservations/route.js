import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

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
    const backendHint = " Comprueba que el backend esté en marcha y que en .env.local tengas NEXT_PUBLIC_API_URL correcto (ej. http://localhost:4000/api/v1 si el backend corre en el puerto 4000).";

    // 1. Crear cliente
    let clientRes;
    try {
      clientRes = await fetch(`${base}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: cleanPhone }),
        cache: "no-store",
      });
    } catch (fetchErr) {
      console.error("[reservations] Error llamando al backend (clients):", fetchErr);
      return NextResponse.json(
        { error: "No se pudo conectar con el backend." + backendHint },
        { status: 502 },
      );
    }

    const clientText = await clientRes.text();
    let clientData;
    try {
      clientData = clientText ? JSON.parse(clientText) : {};
    } catch {
      return NextResponse.json(
        { error: "La respuesta del backend no es válida (crear cliente)." + backendHint },
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
        { error: "La API no devolvió el ID del cliente." + backendHint },
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

    let resRes;
    try {
      resRes = await fetch(`${base}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationBody),
        cache: "no-store",
      });
    } catch (fetchErr) {
      console.error("[reservations] Error llamando al backend (reservations):", fetchErr);
      return NextResponse.json(
        { error: "No se pudo conectar con el backend al crear la reserva." + backendHint },
        { status: 502 },
      );
    }

    const resText = await resRes.text();
    let resData = {};
    try {
      resData = resText ? JSON.parse(resText) : {};
    } catch {
      if (!resRes.ok) {
        // Backend en desarrollo suele enviar errores en texto plano (no JSON)
        const isHtml = resText && (resText.trimStart().startsWith("<") || resText.includes("<!DOCTYPE"));
        const msg = isHtml
          ? `El backend devolvió HTML (status ${resRes.status}). Comprueba la URL y que POST /reservations exista.` + backendHint
          : (resText && resText.trim()) || `Error del backend (${resRes.status})`;
        return NextResponse.json(
          { error: msg },
          { status: resRes.status >= 400 && resRes.status < 600 ? resRes.status : 502 },
        );
      }
      // Si el status es 2xx pero el cuerpo no es JSON, asumimos que la reserva se creó
    }

    if (!resRes.ok) {
      const msg = resData.message || resData.error || resText || "Error al crear la reserva";
      return NextResponse.json({ error: msg }, { status: resRes.status });
    }

    // Enviar confirmación por WhatsApp y por email (sin bloquear la respuesta)
    let baseApi = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    try {
      const url = new URL(request.url);
      baseApi = url.origin;
    } catch (_) {}
    baseApi = baseApi.replace(/\/$/, "");
    const payloadWhatsApp = { name, phone: cleanPhone, date: String(date), time: String(time), people: Number(people_count) };
    const payloadEmail = { name, phone: cleanPhone, email: email || "", date: String(date), time: String(time), people: Number(people_count) };

    const notifyCalls = [
      fetch(`${baseApi}/api/send-whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadWhatsApp),
      }),
    ];
    if (payloadEmail.email && payloadEmail.email.trim()) {
      notifyCalls.push(
        fetch(`${baseApi}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadEmail),
        })
      );
    }
    try {
      await Promise.allSettled(notifyCalls);
    } catch (notifyErr) {
      console.error("[reservations] Error enviando WhatsApp/email:", notifyErr);
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
