import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Heart, Shield, Flame, Copy, Check, Trash2, ArrowDown, Bot, User } from "lucide-react";
import { DialogueMessage, ProtocolDefinition } from "../../types/protocols";

interface ProtocolDialogueFeedProps {
  activeProtocol: ProtocolDefinition;
  messages: DialogueMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClearSession: () => void;
}

export default function ProtocolDialogueFeed({
  activeProtocol,
  messages,
  isLoading,
  onSendMessage,
  onClearSession
}: ProtocolDialogueFeedProps) {
  const [inputText, setInputText] = useState("");
  const [hasCopiedTranscript, setHasCopiedTranscript] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleCopyTranscript = () => {
    const text = messages
      .map((m) => {
        const sender = m.role === "user" ? "Practitioner" : "Protocol Facilitator";
        const meta = m.metrics
          ? ` [∇ℰ: ${m.metrics.gradientTension || "-"}% | μ_soma: ${m.metrics.somaticAliveness || "-"}% | δ: ${m.metrics.sovereignty || "-"}%]`
          : "";
        return `${sender}${meta}:\n${m.content}\n`;
      })
      .join("\n---\n\n");

    navigator.clipboard.writeText(text);
    setHasCopiedTranscript(true);
    setTimeout(() => setHasCopiedTranscript(false), 2500);
  };

  return (
    <div className="rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col h-[650px] shadow-xl overflow-hidden">
      {/* Feed Header */}
      <div className="px-5 py-3.5 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            {activeProtocol.title} Session Dialogue
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
            {messages.length} Turns
          </span>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleCopyTranscript}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-stone-400 hover:text-white bg-stone-900 border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
                title="Copy full dialogue session"
              >
                {hasCopiedTranscript ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopiedTranscript ? "Copied Transcript" : "Copy All"}</span>
              </button>
              <button
                type="button"
                onClick={onClearSession}
                className="p-1 rounded-lg text-stone-500 hover:text-red-400 hover:bg-stone-900 transition-colors cursor-pointer"
                title="Reset session dialogue"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Message History Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-xl">
              {activeProtocol.symbol}
            </div>
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-white mb-1">
                Begin {activeProtocol.title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {activeProtocol.tagline}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2 justify-center max-w-lg">
              {activeProtocol.samplePrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSendMessage(p)}
                  className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 hover:border-amber-500/40 hover:text-white transition-all cursor-pointer"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-3 text-xs ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 font-mono font-bold text-xs shrink-0 mt-0.5">
                    {activeProtocol.symbol}
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2.5 ${
                    isUser
                      ? "bg-amber-500 text-stone-950 font-medium ml-auto shadow-md"
                      : "bg-stone-950/80 border border-stone-800 text-stone-200"
                  }`}
                >
                  {/* Assistant Meta Badge Header */}
                  {!isUser && m.metrics && (
                    <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-stone-800 text-[10px] font-mono">
                      {m.metrics.gradientTension !== undefined && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>∇ℰ: {m.metrics.gradientTension}%</span>
                        </span>
                      )}
                      {m.metrics.somaticAliveness !== undefined && (
                        <span className="flex items-center gap-1 text-red-400">
                          <Heart className="w-3 h-3 text-red-400" />
                          <span>μ_soma: {m.metrics.somaticAliveness}%</span>
                        </span>
                      )}
                      {m.metrics.sovereignty !== undefined && (
                        <span className="flex items-center gap-1 text-teal-400">
                          <Shield className="w-3 h-3 text-teal-400" />
                          <span>δ: {m.metrics.sovereignty}%</span>
                        </span>
                      )}
                      {m.metrics.stance && (
                        <span className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 ml-auto">
                          {m.metrics.stance}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Body Text */}
                  <div className="whitespace-pre-wrap leading-relaxed font-light text-xs">
                    {m.content}
                  </div>

                  {/* Interventions Highlight */}
                  {!isUser && m.metrics?.appliedIntervention && (
                    <div className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Intervention: {m.metrics.appliedIntervention}</span>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex gap-3 text-xs justify-start">
            <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 font-mono font-bold text-xs shrink-0 mt-0.5 animate-pulse">
              {activeProtocol.symbol}
            </div>
            <div className="bg-stone-950/80 border border-stone-800 text-stone-400 rounded-2xl px-4 py-3 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Co-holding tension & calculating topological resonance...</span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 bg-stone-950/80 border-t border-stone-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Inhabit ${activeProtocol.title} (e.g., share a tension, dilemma, or creative seed)...`}
          className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Transmit</span>
        </button>
      </form>
    </div>
  );
}
