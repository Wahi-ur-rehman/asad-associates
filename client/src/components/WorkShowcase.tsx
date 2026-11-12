import { CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, Volume2, VolumeX, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { workClips, WorkClip } from "@/lib/clips";

function WorkCard({
  clip,
  index,
  soundId,
  onSound,
}: {
  clip: WorkClip;
  index: number;
  soundId: string | null;
  onSound: (id: string | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const withSound = soundId === clip.id;

  /* Play only while on screen (muted autoplay) */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced && !userPaused) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [userPaused]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !withSound;
  }, [withSound]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      void video.play().catch(() => undefined);
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <div className="work-slot" data-reveal style={{ "--d": `${index * 90}ms` } as CSSProperties}>
      <article className="work-card group">
        <div className="work-media">
          <div className="work-frame">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={clip.poster}
              aria-label={clip.alt}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={clip.src} type="video/mp4" />
            </video>

            {/* Top metadata badges */}
            <div className="work-top-meta">
              <span className="work-index font-mono" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="work-badge-verified">
                <ShieldCheck size={11} className="text-teal-300" />
                Verified Field Build
              </span>
            </div>

            {/* Video Controls overlay */}
            <div className="work-controls">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? `Pause ${clip.title}` : `Play ${clip.title}`}
                title={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                type="button"
                onClick={() => onSound(withSound ? null : clip.id)}
                aria-pressed={withSound}
                aria-label={withSound ? `Mute ${clip.title}` : `Play with sound`}
                title={withSound ? "Mute" : "Listen with audio"}
              >
                {withSound ? <Volume2 size={14} className="text-teal-300" /> : <VolumeX size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="work-caption">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="work-tag">{clip.tag}</span>
            <span className="work-location flex items-center gap-1">
              <MapPin size={10} className="text-teal-400" />
              {clip.location}
            </span>
          </div>
          <h3 className="group-hover:text-teal-200 transition-colors">{clip.title}</h3>
        </div>
      </article>
    </div>
  );
}

export default function WorkShowcase() {
  const [soundId, setSoundId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pool" | "waterfall" | "fountain">("all");

  const filteredClips =
    filter === "all" ? workClips : workClips.filter((c) => c.category === filter);

  return (
    <section className="work-section" id="work" data-reveal>
      <div className="section-heading">
        <div>
          <div className="section-kicker flex items-center gap-2">
            <Sparkles size={13} className="text-teal-300" />
            <span>Field Evidence & Proven Installations</span>
          </div>
          <h2>
            Water Architecture,<br />
            <i>in motion.</i>
          </h2>
        </div>
        <p>
          Real site footage captured directly from completed installations across Islamabad, Lahore, and private estates. Precision hydraulics, living stone, and night lighting.
        </p>
      </div>

      {/* Category Filter Pills (Hallmark & Raycast styled) */}
      <div className="work-filter-bar">
        {[
          { key: "all", label: "All Evidence (06)" },
          { key: "pool", label: "Swimming Pools" },
          { key: "waterfall", label: "Rock Waterfalls" },
          { key: "fountain", label: "Laminar Fountains" },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            className={`work-filter-btn ${filter === item.key ? "is-active" : ""}`}
            onClick={() => setFilter(item.key as typeof filter)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid of Work Proof Clips */}
      <div className="work-grid">
        {filteredClips.map((clip, index) => (
          <WorkCard
            key={clip.id}
            clip={clip}
            index={index}
            soundId={soundId}
            onSound={setSoundId}
          />
        ))}
      </div>

      {/* Bottom Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-16 pt-8 border-t border-teal-900/30">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-200/60">
          Turnkey Execution · 26+ Years of Proven Craft
        </span>
        <div className="flex items-center gap-4">
          <a className="button button-light" href="#contact">
            Request Site Consultation <ArrowUpRight size={15} />
          </a>
          <a className="text-link" href="/services/fountains-waterfalls">
            Explore Fountains & Waterfalls <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
