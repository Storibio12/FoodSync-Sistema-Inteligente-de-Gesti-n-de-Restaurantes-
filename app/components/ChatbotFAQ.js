"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  X, 
  MessageSquare, 
  RefreshCw, 
  Bot, 
  User, 
  Sparkles,
  ChevronDown
} from "lucide-react";

const FAQ_ITEMS = [
  { question: "¿Cuáles son los horarios?", answer: "Estamos abiertos todos los días de 09:30 AM a 11:00 PM. ¡Te esperamos!" },
  { question: "¿Cómo hago una reserva?", answer: 'Puedes hacer tu reserva fácilmente en nuestra página de reservas. Haz clic <a href="/reservation" class="cb-link">aquí para reservar tu mesa</a>.' },
  { question: "¿Dónde están ubicados?", answer: "Nos encontramos en 8th floor, 379 Hudson St, New York, NY 10018. ¡Ven a visitarnos!" },
  { question: "¿Cuál es el menú?", answer: 'Ofrecemos Almuerzo, Cena, Happy Hour, Bebidas, Entrantes y Postres. Consulta nuestro <a href="/menu" class="cb-link">menú completo aquí</a>.' },
];

const WELCOME_MSG = {
  from: "bot",
  text: "¡Hola! 👋 Soy su <strong>Conserje de FoodSync</strong>. Es un placer saludarle. ¿En qué puedo asistirle hoy?",
};

export default function ChatbotFAQ() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setShowChips(false);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });

      const data = await response.json();
      const botMsg = { from: "bot", text: data.text || "Disculpe, he tenido un inconveniente técnico." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = { from: "bot", text: "Mis disculpas, parece que hay un problema con la conexión." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
    setIsTyping(false);
  };

  return (
    <>
      <style>{`
        .glass-panel {
          background: rgba(26, 26, 26, 0.9) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .premium-gradient {
          background: linear-gradient(135deg, #c0392b 0%, #7b241c 100%) !important;
        }
        .cb-messages::-webkit-scrollbar { width: 5px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .loading-dot {
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        .cb-link { color: #f1948a !important; text-decoration: underline !important; }
      `}</style>

      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-7 right-7 z-[99999] w-14 h-14 rounded-full premium-gradient text-white flex items-center justify-center shadow-[0_8px_32px_rgba(192,57,43,0.4)] cursor-pointer outline-none border-none overflow-hidden"
        onClick={() => setOpen((v) => !v)}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
            <span className="absolute -top-1 -right-1 bg-white text-[#c0392b] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-[#c0392b]">
                AI
            </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-7 z-[99998] w-[350px] max-w-[calc(100vw-40px)] glass-panel rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="premium-gradient p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-wide">FoodSync Concierge</div>
                  <div className="text-[10px] flex items-center gap-1.5 opacity-90">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    Asistente Inteligente
                  </div>
                </div>
              </div>
              <button onClick={handleReset} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[400px] flex flex-col gap-4 cb-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.from === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"} items-end gap-2`}
                >
                  {msg.from === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Bot size={12} className="text-[#f1948a]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] text-xs leading-relaxed p-3 rounded-2xl ${
                      msg.from === "bot"
                        ? "bg-white/5 text-gray-200 rounded-bl-none border border-white/5"
                        : "premium-gradient text-white rounded-br-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  {msg.from === "user" && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <User size={12} className="text-white/60" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot size={12} className="text-[#f1948a]" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                    <div className="loading-dot" />
                    <div className="loading-dot" style={{ animationDelay: "0.2s" }} />
                    <div className="loading-dot" style={{ animationDelay: "0.4s" }} />
                  </div>
                </motion.div>
              )}

              {showChips && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {FAQ_ITEMS.map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChip(item)}
                      className="bg-white/5 border border-white/10 text-[11px] text-gray-300 py-2 px-4 rounded-full hover:bg-white/10 transition-colors text-left"
                    >
                      {item.question}
                    </motion.button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Escriba su consulta..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-gray-200 outline-none focus:border-[#c0392b]/50 transition-colors"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 p-2 text-[#c0392b] hover:text-[#e74c3c] disabled:opacity-30 transition-colors"
                >
                  {isTyping ? <Sparkles size={18} className="animate-pulse" /> : <Send size={18} />}
                </button>
              </div>
              <div className="text-center mt-3 opacity-30 text-[9px] text-gray-400 flex items-center justify-center gap-1">
                Powered by FoodSync AI <Sparkles size={8} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
