import { Sparkles, Music, BookOpen, Sliders, Feather, Flame, Disc, Layers, Radio, Clock, Dna, Waves, ShieldCheck } from "lucide-react";

interface HeaderProps {
  currentView?: "protocols" | "fidelity" | "studio" | "busking" | "bambam" | "ethiojazz" | "afro1965" | "oddmeter" | "ambiences" | "breed" | "trumpet" | "debussy" | "raga" | "harmonic";
  onSelectView?: (view: "protocols" | "fidelity" | "studio" | "busking" | "bambam" | "ethiojazz" | "afro1965" | "oddmeter" | "ambiences" | "breed" | "trumpet" | "debussy" | "raga" | "harmonic") => void;
}

export default function Header({ currentView = "studio", onSelectView }: HeaderProps) {
  return (
    <header className="relative py-8 px-6 md:px-8 border-b border-white/5 bg-transparent overflow-hidden">
      {/* Abstract Glowing Aura behind header */}
      <div className="absolute top-[-80px] right-[10%] w-[400px] h-[200px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[-80px] left-[10%] w-[300px] h-[150px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand/Mark */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 border border-white/20 rotate-45 flex items-center justify-center bg-stone-900/50 shadow-inner">
            <div className="w-4 h-4 bg-amber-500 -rotate-45" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono">Alchemical & Harmonic Studio</div>
            <span className="tracking-[0.2em] font-semibold text-sm uppercase text-white">Shine in Peace</span>
          </div>
        </div>

        {/* View Switcher Pill */}
        {onSelectView && (
          <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-white/10 shadow-inner overflow-x-auto max-w-full">
            <button
              onClick={() => onSelectView("protocols")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "protocols"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-amber-300/80 hover:text-amber-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>DDSP ASMR</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "protocols" ? "bg-stone-900 text-amber-300 font-bold" : "bg-amber-500/20 text-amber-300"
              }`}>
                8
              </span>
            </button>
            <button
              onClick={() => onSelectView("fidelity")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "fidelity"
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "text-indigo-300/80 hover:text-indigo-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Reference Locks</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "fidelity" ? "bg-stone-900 text-indigo-300 font-bold" : "bg-indigo-500/20 text-indigo-300"
              }`}>
                10
              </span>
            </button>
            <button
              onClick={() => onSelectView("studio")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "studio"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Prompt Studio</span>
            </button>
            <button
              onClick={() => onSelectView("busking")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "busking"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>Busking Tracks</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "busking" ? "bg-stone-900 text-amber-300 font-bold" : "bg-amber-500/20 text-amber-300"
              }`}>
                10
              </span>
            </button>
            <button
              onClick={() => onSelectView("bambam")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "bambam"
                  ? "bg-orange-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Bam Bam Jamm</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "bambam" ? "bg-stone-900 text-orange-300 font-bold" : "bg-orange-500/20 text-orange-300"
              }`}>
                10
              </span>
            </button>
            <button
              onClick={() => onSelectView("ethiojazz")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "ethiojazz"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-amber-300/80 hover:text-amber-200"
              }`}
            >
              <Disc className="w-3.5 h-3.5 text-amber-400" />
              <span>Ethio-Jazz</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "ethiojazz" ? "bg-stone-900 text-amber-300 font-bold" : "bg-amber-500/20 text-amber-300"
              }`}>
                5
              </span>
            </button>
            <button
              onClick={() => onSelectView("afro1965")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "afro1965"
                  ? "bg-yellow-500 text-stone-950 font-bold shadow-sm"
                  : "text-yellow-300/80 hover:text-yellow-200"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-yellow-400" />
              <span>1965 Afro</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "afro1965" ? "bg-stone-900 text-yellow-300 font-bold" : "bg-yellow-500/20 text-yellow-300"
              }`}>
                5
              </span>
            </button>
            <button
              onClick={() => onSelectView("oddmeter")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "oddmeter"
                  ? "bg-cyan-500 text-stone-950 font-bold shadow-sm"
                  : "text-cyan-300/80 hover:text-cyan-200"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Odd Meters</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "oddmeter" ? "bg-stone-900 text-cyan-300 font-bold" : "bg-cyan-500/20 text-cyan-300"
              }`}>
                7
              </span>
            </button>
            <button
              onClick={() => onSelectView("ambiences")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "ambiences"
                  ? "bg-emerald-500 text-stone-950 font-bold shadow-sm"
                  : "text-emerald-300/80 hover:text-emerald-200"
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-emerald-400" />
              <span>Studios & Ambiences</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "ambiences" ? "bg-stone-900 text-emerald-300 font-bold" : "bg-emerald-500/20 text-emerald-300"
              }`}>
                21
              </span>
            </button>
            <button
              onClick={() => onSelectView("breed")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "breed"
                  ? "bg-purple-500 text-stone-950 font-bold shadow-sm"
                  : "text-purple-300/80 hover:text-purple-200"
              }`}
            >
              <Dna className="w-3.5 h-3.5 text-purple-400" />
              <span>Breed Styles</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "breed" ? "bg-stone-900 text-purple-300 font-bold" : "bg-purple-500/20 text-purple-300"
              }`}>
                Lab
              </span>
            </button>
            <button
              onClick={() => onSelectView("trumpet")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "trumpet"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Disc className="w-3.5 h-3.5 text-amber-300" />
              <span>Trumpet Suite</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "trumpet" ? "bg-stone-900 text-amber-300 font-bold" : "bg-amber-500/20 text-amber-300"
              }`}>
                10
              </span>
            </button>
            <button
              onClick={() => onSelectView("raga")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "raga"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Raga Suite</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "raga" ? "bg-stone-900 text-amber-300 font-bold" : "bg-orange-500/20 text-orange-300"
              }`}>
                10
              </span>
            </button>
            <button
              onClick={() => onSelectView("debussy")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "debussy"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Feather className="w-3.5 h-3.5 text-teal-400" />
              <span>Debussy Suite</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                currentView === "debussy" ? "bg-stone-900 text-amber-300 font-bold" : "bg-amber-500/20 text-amber-300"
              }`}>
                10
              </span>
            </button>
            <button
              onClick={() => onSelectView("harmonic")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                currentView === "harmonic"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Harmonic Engine</span>
            </button>
          </div>
        )}

        {/* Stats and Limitations info */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 font-mono">
          <div className="flex items-center gap-1.5 border border-white/10 rounded-lg px-3 py-1.5 bg-white/[0.02]">
            <Music className="w-3 h-3 text-amber-500" />
            <span>Style: max 120 chars</span>
          </div>
          <div className="flex items-center gap-1.5 border border-white/10 rounded-lg px-3 py-1.5 bg-white/[0.02]">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Lyrics: max 3,000 chars</span>
          </div>
        </div>
      </div>
    </header>
  );
}
