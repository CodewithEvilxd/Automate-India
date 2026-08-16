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
    recognition.lang = "hi-IN"; // Supports Hindi & Hinglish
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
    <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-5 font-mono text-xs mb-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-[#D98A3D]" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#EDEAE0] font-semibold">
            Multilingual Indic Voice & Chat Ingestion (Hindi / English)
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#D98A3D]/20 border border-[#D98A3D]/40 text-[#D98A3D] text-[10px] font-bold uppercase tracking-wider">
          Informal Sector Bridge
        </span>
      </div>

      <p className="text-[#8B9188] font-sans text-xs mb-4">
        Weighbridge workers or scrap aggregators can speak or type natural Hindi/Hinglish scrap details. CircularChain AI extracts category, mass, and location to auto-fill the lot.
      </p>

      {/* Voice & Input Bar */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={handleSpeech}
          className={`px-3 py-2.5 rounded-[4px] border font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
            isListening
              ? "bg-[#E57373]/20 border-[#E57373] text-[#E57373] animate-pulse"
              : "bg-[#10140F] border-[#2E362C] hover:border-[#D98A3D]/50 text-[#EDEAE0]"
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#D98A3D]" />}
          <span className="hidden sm:inline">{isListening ? "Listening..." : "Speak (Hindi/Eng)"}</span>
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleParse(inputText))}
          placeholder="e.g. Noida Sec 63 me 450 kilo clean aluminum scrap ready hai..."
          className="flex-1 bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded-[4px] px-3.5 py-2.5 text-xs text-[#EDEAE0] outline-none font-sans"
        />

        <button
          type="button"
          disabled={loading || !inputText.trim()}
          onClick={() => handleParse(inputText)}
          className="px-4 py-2.5 bg-[#4E9B6F] hover:bg-[#64B587] disabled:opacity-50 text-[#10140F] rounded-[4px] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{loading ? "Parsing..." : "Auto-Fill"}</span>
        </button>
      </div>

      {/* Sample Quick Prompt Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-[#8B9188] uppercase tracking-wider block">
          Quick Demo Voice Prompts (Click to Test):
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
              className="px-2.5 py-1 rounded bg-[#10140F] hover:bg-[#232B22] border border-[#2E362C] hover:border-[#4E9B6F]/40 text-[#8B9188] hover:text-[#EDEAE0] font-sans text-[11px] text-left transition-colors"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Parsed Result Flash Alert */}
      {recentParsed && (
        <div className="mt-4 p-3 bg-[#10140F] border border-[#4E9B6F]/40 rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
            <span className="text-[#4E9B6F] font-bold text-xs">
              Extracted: {recentParsed.category.toUpperCase()} &bull; {recentParsed.estimated_weight_kg} kg &bull; {recentParsed.location}
            </span>
          </div>
          <span className="text-[10px] text-[#8B9188]">Form Auto-Populated</span>
        </div>
      )}
    </div>
  );
}
