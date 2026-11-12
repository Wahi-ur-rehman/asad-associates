import { useEffect, useRef, useState } from "react";
import { startWaterGL } from "@/lib/waterGL";
import { Sparkles, MapPin } from "lucide-react";

export default function WaterHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoActive, setVideoActive] = useState(true);

  // Initialize interactive WebGL water physics
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const handle = startWaterGL(canvas, { pointerTarget: host, reducedMotion });
    return () => handle?.destroy();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. Master showcase video combining all real client installations */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          videoActive ? "opacity-95 scale-100" : "opacity-0"
        }`}
        style={{ filter: "brightness(0.85) contrast(1.15) saturate(1.1)" }}
      >
        <source src="/videos/hero-showcase-master.mp4" type="video/mp4" />
      </video>

      {/* 2. Fluid dynamic WebGL water ripple canvas overlay */}
      <canvas
        ref={canvasRef}
        className="hero-water absolute inset-0 w-full h-full pointer-events-auto mix-blend-screen opacity-65"
        aria-hidden="true"
        title="Interactive water: move mouse or touch to create ripples"
      />

      {/* 3. Deep luxury gradient vignettes for readable typography */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,22,22,0.88) 0%, rgba(7,22,22,0.52) 48%, rgba(7,22,22,0.18) 82%), linear-gradient(180deg, rgba(7,22,22,0.65) 0%, transparent 22%, transparent 72%, rgba(7,22,22,0.88) 100%)",
        }}
      />

      {/* 4. Real Site Footage Badge */}
      <div className="absolute top-28 right-6 z-10 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/75 border border-teal-500/30 text-sand text-[11px] font-sans backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium text-teal-200">Real Project Reel</span>
          <span className="text-sand/50">· Fountains, Waterfalls & Pools</span>
        </div>

        <button
          onClick={() => setVideoActive(!videoActive)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/70 hover:bg-stone-900 border border-teal-500/20 text-sand/80 hover:text-white text-[11px] font-sans backdrop-blur-md transition-all shadow-md"
          title="Toggle between cinematic video and pure fluid water"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
          <span>{videoActive ? "Video: On" : "Ripples: Only"}</span>
        </button>
      </div>

      {/* 5. Office footprint bar */}
      <div className="absolute bottom-6 right-6 z-10 hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-sand/70 bg-stone-950/60 px-3 py-1.5 rounded-sm border border-stone-800 backdrop-blur-sm">
        <MapPin className="w-3 h-3 text-teal-400" />
        <span>Islamabad HQ · Lahore Branch · Projects Across Pakistan</span>
      </div>
    </div>
  );
}
