import { NextResponse } from "next/server";
import twilio from "twilio";

/**
 * POST /api/send-whatsapp
 * Body: { name, phone, date, time, people }
 * Env: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, people, type } = body;

    if (!name || !phone || !date || !time || people == null) {
      return NextResponse.json(
        { error: "Faltan datos: name, phone, date, time, people." },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json(
        { error: "Configuración de Twilio incompleta (variables de entorno)." },
        { status: 500 }
      );
    }

    let toPhone = String(phone).replace(/\D/g, "");
    if (toPhone.length === 10) toPhone = "1" + toPhone;
    const to = toPhone.startsWith("whatsapp:") ? toPhone : `whatsapp:+${toPhone}`;
    const from = fromNumber.startsWith("whatsapp:") ? fromNumber : `whatsapp:${fromNumber}`;

    const isReminder = type === "reminder";
    const messageBody = isReminder
      ? `Hola ${name} 📅\n\nRecordatorio: tienes una reservación mañana.\n\n📅 Fecha: ${date}\n⏰ Hora: ${time}\n👥 Personas: ${people}\n\nTe esperamos.`
      : `Hola ${name} ✅\n\nTu reservación ha sido confirmada.\n\n📅 Fecha: ${date}\n⏰ Hora: ${time}\n👥 Personas: ${people}\n\nGracias por reservar con nosotros.`;

    const client = twilio(accountSid, authToken);
    await client.messages.create({
      body: messageBody,
      from: from,
      to: to,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[send-whatsapp]", err);
    let message = err.message || "Error al enviar WhatsApp.";
    if (err.code === 63007) {
      message = "El número From no es un canal WhatsApp válido. En Twilio Console usa el número del Sandbox (Messaging > Try WhatsApp > From) o configura WhatsApp Business.";
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
