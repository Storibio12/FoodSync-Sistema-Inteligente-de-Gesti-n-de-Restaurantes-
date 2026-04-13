import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Eres el Conserje de FoodSync, un asistente virtual sofisticado, amable y profesional para el restaurante FoodSync.
Tu objetivo es ayudar a los clientes con información sobre el menú, reservas, horarios y ubicación.
Hablas con un tono pulcro y elegante.

DATOS DEL RESTAURANTE:
- Horario: Todos los días de 09:30 AM a 11:00 PM.
- Ubicación: 8th floor, 379 Hudson St, New York, NY 10018.
- Contacto: (+1) 96 716 6879 / contact@site.com.
- Menú: Ofrecemos Almuerzo, Cena, Happy Hour, Bebidas, Entrantes y Postres.

REGLAS:
1. Sé conciso pero elegante.
2. Si no sabes algo, invita al cliente a llamar o escribir un correo.
3. Puedes sugerir platos del menú si te preguntan por recomendaciones.
4. Mantén siempre la cortesía.
`;

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    // En una implementación real, aquí llamarías a OpenAI o Gemini.
    // Por ahora, simularemos una respuesta inteligente basada en el sistema.
    // Si el usuario configura GEMINI_API_KEY, podrías usar el SDK.

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Implementación real de Gemini
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
          history: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Entendido. Soy el Conserje de FoodSync. ¿En qué puedo ayudarle hoy?" }] },
            ...history.map(m => ({
              role: m.from === "bot" ? "model" : "user",
              parts: [{ text: m.text }]
            }))
          ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return NextResponse.json({ text: response.text() });
      } catch (err) {
        console.error("Error calling Gemini:", err);
        return NextResponse.json({ 
          text: "Mis disculpas, estoy experimentando una pequeña interrupción técnica. ¿Podría intentar nuevamente en un momento?" 
        });
      }
    }

    // Fallback Mock (Simulando "inteligencia" simple)
    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const cleanMsg = normalize(message);
    
    // Check history for context (basic)
    const lastBotMsg = history.length > 0 ? history[history.length - 1] : null;
    const isRecommendationPrompt = lastBotMsg && lastBotMsg.from === "bot" && lastBotMsg.text.includes("recomiende");

    let reply = "Mis disculpas, no he comprendido del todo su solicitud. ¿Podría ser más específico o tal vez preguntarme sobre nuestro menú, horarios o ubicación?";

    if (isRecommendationPrompt && (cleanMsg === "si" || cleanMsg.includes("claro") || cleanMsg.includes("por favor"))) {
      reply = "¡Excelente elección! Le recomiendo probar nuestro **Solomillo al Vino Tinto** para la cena, o nuestros **Huevos Benedictinos** si nos visita para el almuerzo. ¿Desea saber algo más sobre estos platos?";
    } else if (cleanMsg.includes("menu") || cleanMsg.includes("carta") || cleanMsg.includes("comer")) {
      reply = "Disponemos de una exquisita selección para Almuerzo, Cena, y una selecta carta de postres y bebidas. Puede consultar los detalles en nuestra sección de Menú. ¿Desea que le recomiende algo en particular?";
    } else if (cleanMsg.includes("horario") || cleanMsg.includes("hora") || cleanMsg.includes("abierto")) {
      reply = "Nuestras puertas están abiertas para deleitarle todos los días de 09:30 AM a 11:00 PM.";
    } else if (cleanMsg.includes("ubicacion") || cleanMsg.includes("donde") || cleanMsg.includes("direccion") || cleanMsg.includes("llegar")) {
      reply = "Nos encontramos ubicados en el octavo piso del 379 Hudson St, New York, NY 10018. Será un honor recibirle.";
    } else if (cleanMsg.includes("reserva") || cleanMsg.includes("mesa") || cleanMsg.includes("reservar")) {
      reply = "Puede gestionar sus reservas a través de nuestra sección dedicada en el sitio web o permítame guiarle si lo desea.";
    } else if (cleanMsg.includes("hola") || cleanMsg.includes("buenos dias") || cleanMsg.includes("saludos")) {
      reply = "¡Buenas! Un placer saludarle. Soy su conserje de FoodSync. ¿Cómo puedo asistirle en su experiencia gastronómica hoy?";
    }

    return NextResponse.json({ text: reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
