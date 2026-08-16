"use client";

import React, { useState } from "react";
import { Mic, MicOff, Sparkles, Send, Volume2, ArrowRight } from "lucide-react";
import { parseIndicVoiceListing, IndicParsedListing } from "@/lib/ai-agents";

interface IndicVoiceAssistantProps {
  onParsed: (result: IndicParsedListing) => void;
}

export default function IndicVoiceAssistant({ onParsed }: IndicVoiceAssistantProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentParsed, setRecentParsed] = useState<IndicParsedListing | null>(null);

  const samplePrompts = [
    "Noida Sector 63 me 450 kilo clean aluminum extrusion pada hai",
    "Pune chakan factory se 800 kg washed PET plastic flakes ready hai",
    "Gurugram warehouse me 1200 kilo cardboard gatta scrap available",
    "Bengaluru Peenya cluster me 200 kilo grade B telecom PCB circuit boards",
  ];

  const handleParse = async (textToParse: string) => {
    if (!textToParse.trim()) return;
    setLoading(true);
    try {
      const parsed = await parseIndicVoiceListing(textToParse);
      setRecentParsed(parsed);
      onParsed(parsed);
    } catch (err) {
      console.error("Parse error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use quick sample buttons or text input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleParse(transcript);
    };

    recognition.start();
  };

  return (
    <div className="rounded-2xl glass-panel p-6 border border-slate-200/80 dark:border-white/10 shadow-xl mb-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-500" />
          <span className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
            Multilingual Indic Voice & Chat Ingestion (Hindi / English)
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
          Informal Sector Bridge
        </span>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 leading-relaxed">
        Weighbridge operators or scrap aggregators can speak or type natural Hindi/Hinglish lot descriptions. AI extracts category, mass, and location to auto-populate the smart contract listing.
      </p>

      {/* Voice & Input Bar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={handleSpeech}
          className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
            isListening
              ? "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 animate-pulse"
              : "bg-slate-100 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 hover:border-amber-500/50 text-slate-800 dark:text-slate-200"
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-500" />}
          <span className="hidden sm:inline font-mono">{isListening ? "Listening..." : "Speak (Hindi/Eng)"}</span>
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleParse(inputText))}
          placeholder="e.g. Noida Sec 63 me 450 kilo clean aluminum scrap ready hai..."
          className="flex-1 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
        />

        <button
          type="button"
          disabled={loading || !inputText.trim()}
          onClick={() => handleParse(inputText)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{loading ? "Parsing..." : "Auto-Fill"}</span>
        </button>
      </div>

      {/* Sample Quick Prompts */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
          Quick Demo Voice Prompts (Click to test):
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(prompt);
                handleParse(prompt);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs text-left transition-all"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Parsed Result Flash Alert */}
      {recentParsed && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs">
              Extracted: {recentParsed.category.toUpperCase()} • {recentParsed.estimated_weight_kg} kg • {recentParsed.location}
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Form Auto-Populated</span>
        </div>
      )}
    </div>
  );
}
