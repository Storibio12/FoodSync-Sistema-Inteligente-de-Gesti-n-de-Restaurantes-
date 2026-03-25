"use client";
import { useState, useRef, useEffect } from "react";

const FAQ_ITEMS = [
  {
    question: "¿Cuáles son los horarios?",
    answer:
      "Estamos abiertos todos los días de 09:30 AM a 11:00 PM. ¡Te esperamos!",
  },
  {
    question: "¿Cómo hago una reserva?",
    answer:
      'Puedes hacer tu reserva fácilmente en nuestra página de reservas. Haz clic <a href="/reservation" class="cb-link">aquí para reservar tu mesa</a>.',
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Nos encontramos en 8th floor, 379 Hudson St, New York, NY 10018. ¡Ven a visitarnos!",
  },
  {
    question: "¿Cuál es el menú?",
    answer:
      'Ofrecemos Almuerzo, Cena, Happy Hour, Bebidas, Entrantes y Postres. Consulta nuestro <a href="/menu" class="cb-link">menú completo aquí</a>.',
  },
  {
    question: "¿Cómo los contacto?",
    answer:
      "Puedes llamarnos al <strong>(+1) 96 716 6879</strong> o escribirnos a <strong>contact@site.com</strong>. ¡Con gusto te atendemos!",
  },
  {
    question: "¿Tienen eventos especiales?",
    answer:
      "¡Sí! Organizamos noches de vino, cenas temáticas y eventos especiales. Consulta la sección de Eventos en nuestra página principal.",
  },
];

const WELCOME_MSG = {
  from: "bot",
  text: "¡Hola! 👋 Soy el asistente de <strong>FoodSync</strong>. Selecciona una pregunta o escribe lo que necesitas saber.",
};

function matchFAQ(input) {
  const lower = input.toLowerCase();
  for (const item of FAQ_ITEMS) {
    const keywords = item.question.toLowerCase().split(/\s+/);
    const matchCount = keywords.filter((w) => lower.includes(w) && w.length > 3).length;
    if (matchCount >= 2) return item.answer;
  }
  return null;
}

const CHATBOT_CSS = `
  .cb-toggle-btn {
    position: fixed !important;
    bottom: 28px !important;
    right: 28px !important;
    z-index: 99999 !important;
    width: 58px !important;
    height: 58px !important;
    border-radius: 50% !important;
    background: #c0392b !important;
    color: #fff !important;
    border: none !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 6px 24px rgba(192,57,43,0.45) !important;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s !important;
    outline: none !important;
    overflow: hidden !important;
  }
  .cb-toggle-btn img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .cb-toggle-btn:hover {
    background: #a93226 !important;
    transform: scale(1.08) !important;
  }
  .cb-toggle-btn--open {
    background: #7b241c !important;
  }
  .cb-badge {
    position: absolute !important;
    top: -5px !important;
    right: -5px !important;
    background: #fff !important;
    color: #c0392b !important;
    font-size: 9px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
    padding: 2px 5px !important;
    letter-spacing: 0.04em !important;
    border: 1.5px solid #c0392b !important;
    line-height: 1.3 !important;
    pointer-events: none !important;
  }
  .cb-panel {
    position: fixed !important;
    bottom: 96px !important;
    right: 28px !important;
    z-index: 99998 !important;
    width: 340px !important;
    max-width: calc(100vw - 40px) !important;
    background: #1a1a1a !important;
    border-radius: 18px !important;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5) !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    animation: cb-slideIn 0.28s cubic-bezier(.22,.68,0,1.2) !important;
  }
  @keyframes cb-slideIn {
    from { opacity: 0; transform: translateY(24px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .cb-header {
    background: linear-gradient(135deg, #c0392b 0%, #922b21 100%) !important;
    padding: 14px 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .cb-header-info {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
  }
  .cb-avatar {
    width: 38px !important;
    height: 38px !important;
    border-radius: 50% !important;
    background: #fff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    overflow: hidden !important;
  }
  .cb-avatar img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .cb-name {
    color: #fff !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    letter-spacing: 0.02em !important;
    line-height: 1.3 !important;
  }
  .cb-status {
    color: rgba(255,255,255,0.82) !important;
    font-size: 11px !important;
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
    margin-top: 2px !important;
  }
  .cb-dot {
    width: 7px !important;
    height: 7px !important;
    border-radius: 50% !important;
    background: #2ecc71 !important;
    display: inline-block !important;
    box-shadow: 0 0 6px #2ecc71 !important;
  }
  .cb-reset-btn {
    background: rgba(255,255,255,0.15) !important;
    border: none !important;
    color: #fff !important;
    width: 30px !important;
    height: 30px !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    font-size: 13px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: background 0.2s !important;
  }
  .cb-reset-btn:hover {
    background: rgba(255,255,255,0.3) !important;
  }
  .cb-messages {
    flex: 1 !important;
    overflow-y: auto !important;
    padding: 14px 12px 8px !important;
    min-height: 260px !important;
    max-height: 340px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    scrollbar-width: thin !important;
    scrollbar-color: #333 #1a1a1a !important;
  }
  .cb-messages::-webkit-scrollbar { width: 4px; }
  .cb-messages::-webkit-scrollbar-track { background: #1a1a1a; }
  .cb-messages::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
  .cb-bubble {
    display: flex !important;
    align-items: flex-start !important;
    gap: 8px !important;
    max-width: 88% !important;
    animation: cb-bubbleIn 0.2s ease !important;
  }
  @keyframes cb-bubbleIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cb-bubble--bot { align-self: flex-start !important; }
  .cb-bubble--user {
    align-self: flex-end !important;
    flex-direction: row-reverse !important;
  }
  .cb-bubble-av {
    width: 28px !important;
    height: 28px !important;
    border-radius: 50% !important;
    background: #fff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    margin-top: 2px !important;
    overflow: hidden !important;
  }
  .cb-bubble-av img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .cb-bubble-text {
    background: #2c2c2c !important;
    color: #e8e8e8 !important;
    font-size: 13px !important;
    line-height: 1.55 !important;
    padding: 9px 13px !important;
    border-radius: 14px 14px 14px 4px !important;
    word-break: break-word !important;
  }
  .cb-bubble--user .cb-bubble-text {
    background: #c0392b !important;
    color: #fff !important;
    border-radius: 14px 14px 4px 14px !important;
  }
  .cb-bubble-text a.cb-link { color: #f1948a !important; text-decoration: underline !important; }
  .cb-bubble--user .cb-bubble-text a.cb-link { color: #ffe0dc !important; }
  .cb-chips {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 7px !important;
    padding: 4px 0 2px !important;
  }
  .cb-chip {
    background: #2a2a2a !important;
    color: #e0e0e0 !important;
    border: 1.5px solid #444 !important;
    border-radius: 20px !important;
    padding: 6px 13px !important;
    font-size: 12px !important;
    cursor: pointer !important;
    transition: background 0.2s, border-color 0.2s, color 0.2s !important;
    text-align: left !important;
    line-height: 1.4 !important;
  }
  .cb-chip:hover {
    background: #c0392b !important;
    border-color: #c0392b !important;
    color: #fff !important;
  }
  .cb-input-row {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 10px 12px 12px !important;
    background: #222 !important;
    border-top: 1px solid #2e2e2e !important;
  }
  .cb-input {
    flex: 1 !important;
    background: #2c2c2c !important;
    border: 1.5px solid #3a3a3a !important;
    border-radius: 22px !important;
    color: #e0e0e0 !important;
    font-size: 13px !important;
    padding: 9px 14px !important;
    outline: none !important;
    transition: border-color 0.2s !important;
  }
  .cb-input::placeholder { color: #666 !important; }
  .cb-input:focus { border-color: #c0392b !important; }
  .cb-send-btn {
    background: #c0392b !important;
    color: #fff !important;
    border: none !important;
    border-radius: 50% !important;
    width: 36px !important;
    height: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    font-size: 14px !important;
    flex-shrink: 0 !important;
    transition: background 0.2s, transform 0.15s !important;
  }
  .cb-send-btn:hover {
    background: #a93226 !important;
    transform: scale(1.06) !important;
  }
`;

export default function ChatbotFAQ() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [inputValue, setInputValue] = useState("");
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    const answer = matchFAQ(text);
    const botMsg = {
      from: "bot",
      text:
        answer ||
        "No encontré información sobre eso. Puedes llamarnos al <strong>(+1) 96 716 6879</strong> o escribirnos a <strong>contact@site.com</strong>.",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue("");
    setShowChips(false);
  };

  const handleChip = (item) => {
    const userMsg = { from: "user", text: item.question };
    const botMsg = { from: "bot", text: item.answer };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setShowChips(false);
  };

  const handleReset = () => {
    setMessages([WELCOME_MSG]);
    setShowChips(true);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(inputValue);
  };

  return (
    <>
      <style>{CHATBOT_CSS}</style>

      {/* Floating button */}
      <button
        className={`cb-toggle-btn${open ? " cb-toggle-btn--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat de preguntas frecuentes"
        id="chatbot-toggle-btn"
      >
        {open ? (
          <i className="fa fa-times" aria-hidden="true" style={{ fontSize: "22px" }} />
        ) : (
          <img src="/images/chatbot-logo.png" alt="Logo" />
        )}
        {!open && <span className="cb-badge">FAQ</span>}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="cb-panel" id="chatbot-panel">
          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-info">
              <div className="cb-avatar">
                <img src="/images/chatbot-logo.png" alt="Chatbot Logo" />
              </div>
              <div>
                <div className="cb-name">FoodSync</div>
                <div className="cb-status">
                  <span className="cb-dot" />
                  En línea
                </div>
              </div>
            </div>
            <button
              className="cb-reset-btn"
              onClick={handleReset}
              title="Nueva conversación"
            >
              <i className="fa fa-refresh" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div className="cb-messages" id="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cb-bubble cb-bubble--${msg.from}`}>
                {msg.from === "bot" && (
                  <div className="cb-bubble-av">
                    <img src="/images/chatbot-logo.png" alt="Bot Logo" />
                  </div>
                )}
                <div
                  className="cb-bubble-text"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}

            {showChips && (
              <div className="cb-chips">
                {FAQ_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    className="cb-chip"
                    onClick={() => handleChip(item)}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="cb-input-row">
            <input
              className="cb-input"
              type="text"
              placeholder="Escribe tu pregunta..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              id="chatbot-input"
            />
            <button
              className="cb-send-btn"
              onClick={() => sendMessage(inputValue)}
              aria-label="Enviar"
            >
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
