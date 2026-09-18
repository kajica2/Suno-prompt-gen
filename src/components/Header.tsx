import { Sparkles, Music, BookOpen, Sliders } from "lucide-react";

interface HeaderProps {
  currentView?: "studio" | "harmonic";
  onSelectView?: (view: "studio" | "harmonic") => void;
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
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono">AI Music Studio</div>
            <span className="tracking-[0.2em] font-semibold text-sm uppercase text-white">Suno Aura</span>
          </div>
        </div>

        {/* View Switcher Pill */}
        {onSelectView && (
          <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-white/10 shadow-inner">
            <button
              onClick={() => onSelectView("studio")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                currentView === "studio"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Prompt Studio</span>
            </button>
            <button
              onClick={() => onSelectView("harmonic")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                currentView === "harmonic"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Harmonic Study Engine</span>
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
