import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

/**
 * GET o POST /api/cron/send-reminders
 * Obtiene reservas de la fecha indicada (por defecto mañana), envía WhatsApp y email de recordatorio.
 * Query: date=YYYY-MM-DD (opcional; si no se pasa, se usa mañana en hora local).
 * Seguridad: si existe CRON_SECRET en .env.local, enviar ?secret=CRON_SECRET o header x-cron-secret.
 */
export async function GET(request) {
  return runReminders(request);
}

export async function POST(request) {
  return runReminders(request);
}

async function runReminders(request) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const url = new URL(request.url);
      const querySecret = url.searchParams.get("secret");
      const headerSecret = request.headers.get("x-cron-secret");
      if (querySecret !== cronSecret && headerSecret !== cronSecret) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
    }

    const url = new URL(request.url);
    let dateParam = url.searchParams.get("date");
    if (!dateParam) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateParam = tomorrow.toISOString().slice(0, 10);
    }

    const res = await fetch(`${API_BASE}/reservations/by-date?date=${dateParam}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Backend error", details: text || res.status },
        { status: 502 }
      );
    }

    const json = await res.json();
    const reservations = json?.data?.reservations || [];
    const origin = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL || "http://localhost:3000";

    let sentWhatsApp = 0;
    let sentEmail = 0;
    const errors = [];

    for (const r of reservations) {
      const client = r.client || {};
      const name = client.name || "Cliente";
      const phone = client.phone;
      const email = client.email;
      const date = r.date;
      const time = r.time;
      const people = r.people_count ?? r.people;

      const payload = { name, phone, date, time, people, type: "reminder" };

      if (phone) {
        try {
          const w = await fetch(`${origin}/api/send-whatsapp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, phone }),
          });
          if (w.ok) sentWhatsApp++;
          else errors.push({ reservationId: r.reservation_id, channel: "whatsapp", status: w.status });
        } catch (e) {
          errors.push({ reservationId: r.reservation_id, channel: "whatsapp", error: e.message });
        }
      }

      if (email) {
        try {
          const eRes = await fetch(`${origin}/api/send-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, email }),
          });
          if (eRes.ok) sentEmail++;
          else errors.push({ reservationId: r.reservation_id, channel: "email", status: eRes.status });
        } catch (e) {
          errors.push({ reservationId: r.reservation_id, channel: "email", error: e.message });
        }
      }
    }

    return NextResponse.json({
      success: true,
      date: dateParam,
      totalReservations: reservations.length,
      sentWhatsApp,
      sentEmail,
      errors: errors.length ? errors : undefined,
    });
  } catch (err) {
    console.error("[cron/send-reminders]", err);
    return NextResponse.json(
      { error: err.message || "Error en recordatorios" },
      { status: 500 }
    );
  }
}
