import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/send-email
 * Envía correo de confirmación de reserva usando Nodemailer.
 * Documentación: https://nodemailer.com/about/
 *
 * Body: { name, phone, email?, date, time, people }
 * Env: EMAIL_USER, EMAIL_PASS (opcional: EMAIL_HOST, EMAIL_PORT)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, date, time, people, type } = body;

    if (!name || !date || !time || people == null) {
      return NextResponse.json(
        { error: "Faltan datos: name, date, time, people." },
        { status: 400 }
      );
    }

    const isReminder = type === "reminder";

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return NextResponse.json(
        { error: "Configuración de email incompleta (EMAIL_USER, EMAIL_PASS en .env.local)." },
        { status: 500 }
      );
    }

    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = Number(process.env.EMAIL_PORT) || 587;
    const secure = port === 465;

    // createTransport (Nodemailer): https://nodemailer.com/about/
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        // En desarrollo evita fallo "self-signed certificate in certificate chain"
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });

    const toAddress = email && String(email).trim() ? String(email).trim() : null;
    if (!toAddress) {
      return NextResponse.json(
        { error: "No hay email del cliente para enviar la confirmación." },
        { status: 400 }
      );
    }

    const subject = isReminder ? "Recordatorio: tu reservación - FoodSync" : "Reservación confirmada - FoodSync";
    const intro = isReminder ? "Te recordamos que tienes una reservación:" : "Tu reservación ha sido confirmada.";
    const text = [
      `Hola ${name},`,
      "",
      intro,
      "",
      `Fecha: ${date}`,
      `Hora: ${time}`,
      `Personas: ${people}`,
      `Teléfono: ${phone}`,
      "",
      isReminder ? "Te esperamos." : "Gracias por reservar con nosotros.",
    ].join("\n");

    const html = [
      `<p>Hola <strong>${name}</strong>,</p>`,
      `<p>${intro}</p>`,
      "<ul>",
      `<li>Fecha: ${date}</li>`,
      `<li>Hora: ${time}</li>`,
      `<li>Personas: ${people}</li>`,
      `<li>Teléfono: ${phone}</li>`,
      "</ul>",
      `<p>${isReminder ? "Te esperamos." : "Gracias por reservar con nosotros."}</p>`,
    ].join("\n");

    // sendMail (Nodemailer): from, to, subject, text, html
    await transporter.sendMail({
      from: `"FoodSync Restaurante" <${user}>`,
      to: toAddress,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[send-email]", err);
    let message = err.message || "Error al enviar el correo.";
    if (err.code === "EAUTH" || err.responseCode === 535) {
      message = "Gmail rechazó el usuario/contraseña. Usa una Contraseña de aplicación (Google > Cuenta > Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones), no tu contraseña normal.";
    } else if (err.code === "ESOCKET" && err.message?.includes("certificate")) {
      message = "Error de certificado TLS al conectar con el servidor de correo. Revisa EMAIL_HOST o usa Contraseña de aplicación en Gmail.";
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
