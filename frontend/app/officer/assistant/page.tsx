"use client";

import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { Send, Bot, User, Info, ArrowUpRight, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Halo, saya Asisten AI RoadTierbers. Saya dapat membantu membaca ringkasan monitoring, menjelaskan risiko, memberi saran prioritas area, dan membantu menyusun poin laporan petugas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => m.role === "user" || m.role === "model"),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke backend");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: data.response || "Maaf, terjadi kesalahan pada sistem AI.",
        },
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <OfficerPageShell>
      <div className="flex flex-col items-center max-w-5xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-80px)]">
        {/* 1. Chat Page Header */}
        <div className="w-full mb-6 text-center space-y-2">
          <h1 className="text-xl font-medium text-[#0B1F3A]">Asisten AI Petugas</h1>
          <p className="text-sm text-slate-600">
            Tanyakan ringkasan kondisi, risiko, prioritas area, atau bantuan penyusunan laporan.
          </p>

        </div>

        {/* 2. Main Chat Container */}
        <div className="w-full max-w-4xl flex-1 bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl flex flex-col overflow-hidden h-[600px]">
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
            {messages.length === 1 && (
              <div className="mb-6 pl-12 pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    "Ringkas kondisi lalu lintas saat ini",
                    "Area mana yang perlu diprioritaskan?",
                    "Pelanggaran apa yang paling dominan?",
                    "Apa tindak lanjut yang disarankan?",
                    "Bantu susun poin laporan",
                    "Data apa yang perlu divalidasi?",
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50 hover:border-cyan-200/50 transition-colors text-left group w-full"
                    >
                      <span className="text-sm text-slate-600 leading-snug">
                        {prompt}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-500 shrink-0 ml-2 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-4 max-w-[85%] ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 border ${
                      msg.role === "user"
                        ? "bg-slate-200 text-slate-600 border-slate-300/50"
                        : "bg-cyan-100 text-cyan-600 border-cyan-200/50"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`space-y-1.5 flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <span className="text-xs font-medium text-slate-500 mx-1">
                      {msg.role === "user" ? "Petugas" : "Asisten AI"}
                    </span>
                    <div
                      className={`rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0B1F3A] text-white rounded-tr-sm"
                          : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          strong: ({node, ...props}) => <strong className="font-semibold text-inherit" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-3 space-y-1.5" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-3 space-y-1.5" {...props} />,
                          li: ({node, ...props}) => <li className="marker:text-slate-400" {...props} />,
                          p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                          code: ({node, className, children, ...props}) => {
                            const isInline = !className || !className.includes('language-');
                            return (
                              <code 
                                className={`${isInline ? 'bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-[13px] font-mono' : 'block bg-slate-800 text-slate-200 p-3 rounded-lg overflow-x-auto text-[13px] font-mono my-2'}`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1 border border-cyan-200/50">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-slate-500 ml-1">
                      Asisten AI
                    </span>
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
                      <span className="text-sm text-slate-500">
                        Sedang berpikir...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 6. Chat Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-100/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tulis pertanyaan untuk Asisten AI..."
                  className="flex-1 px-3 py-2 min-h-[44px] bg-transparent outline-none text-sm text-slate-700"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-cyan-600 text-white rounded-xl shadow-sm hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <Info className="w-3 h-3" />
                Asisten AI menggunakan data terbaru dari sistem deteksi untuk memberikan jawaban yang relevan.
              </div>
            </div>
          </div>
        </div>
      </div>
    </OfficerPageShell>
  );
}
