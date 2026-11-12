import { CSSProperties, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Droplets,
  Flower2,
  Mail,
  MessageCircle,
  Menu,
  PenTool,
  Phone,
  Quote,
  Ruler,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
  Facebook,
  Instagram,
  Building2,
  MapPin,
  Globe2,
} from "lucide-react";
import ProjectBrief from "@/components/ProjectBrief";
import WaterHero from "@/components/WaterHero";
import WorkShowcase from "@/components/WorkShowcase";
import LocationMap from "@/components/LocationMap";

const heroImage = "/manus-storage/JLsRo5EBjnSu_6d546692.jpg";
const courtyardImage = "/manus-storage/Sw95XDR9vbmP_ac33857a.webp";
const waterfallImage = "/manus-storage/1WsRgdVzbhQX_331d945c.png";
const logoImage = "/manus-storage/WhatsAppImage2026-10-19at5.02.48PM_a2f52501.jpeg";

const services = [
  { number: "01", icon: Sparkles, title: "Fountains & waterfalls", href: "/services/fountains-waterfalls", text: "Water art with movement, light, and sound — designed to turn a garden, lobby, or farmhouse into a destination." },
  { number: "02", icon: Waves, title: "Swimming pools", href: "/services/swimming-pools", text: "From first sketch to final filtration, we build pools that feel effortless, architectural, and made for your life." },
  { number: "03", icon: Flower2, title: "Landscape design", href: "/services/landscape-design", text: "Layered planting, considered stonework, and outdoor rooms that make the landscape feel like part of the home." },
  { number: "04", icon: Droplets, title: "Care & maintenance", href: "/services/care-maintenance", text: "Water treatment, pump repair, cleaning, and dependable seasonal care that keeps every surface clear and inviting." },
];

const projects = [
  { tag: "Pool concept", title: "The Quiet Edge", location: "Illustrative direction · not a completed project", image: courtyardImage, className: "project-large" },
  { tag: "Water feature", title: "A Living Arrival", location: "Illustrative direction · not a completed project", image: waterfallImage, className: "project-tall" },
  { tag: "Landscape direction", title: "Open Sky Retreat", location: "Illustrative direction · not a completed project", image: heroImage, className: "project-wide" },
];

const process = [
  { number: "01", icon: CalendarDays, title: "The consultation", text: "We listen first — to the site, the architecture, and the way you want the space to feel." },
  { number: "02", icon: PenTool, title: "The design", text: "Our designers shape the experience, finishes, planting, lighting, and water systems into one clear vision." },
  { number: "03", icon: Ruler, title: "The build", text: "One experienced team coordinates the details, the craft, and the quality from groundworks to final finish." },
  { number: "04", icon: ClipboardCheck, title: "The care", text: "We stay close after handover with maintenance, water treatment, and support that protects your investment." },
];

function Brand({ footer = false }: { footer?: boolean }) {
  const [logoFailed, setLogoFailed] = useState(false);
  return <a className={`brand-lockup ${footer ? "brand-lockup-footer" : ""}`} href="/#top" aria-label="Asad Associates home"><span className="brand-logo-wrap">{logoFailed ? <b className="brand-monogram" aria-hidden="true">A</b> : <img src={logoImage} alt="Asad Associates logo" onError={() => setLogoFailed(true)} />}</span><span className="brand-copy"><strong>Asad</strong><em>Associates</em></span></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [progress, setProgress] = useState(0);
  const filters = ["All", "Pool concept", "Water feature", "Landscape direction"];
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.tag === activeFilter);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); revealObserver.disconnect(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} style={{ "--progress": progress } as CSSProperties}><Brand /><nav className={`main-nav ${menuOpen ? "is-open" : ""}`}><a href="/#services" onClick={closeMenu}>Expertise</a><a href="/#work" onClick={closeMenu}>Our work</a><a href="/#process" onClick={closeMenu}>Process</a><a href="/#projects" onClick={closeMenu}>Concepts</a><a href="/privacy" onClick={closeMenu}>Privacy</a><a className="nav-contact" href="/#contact" onClick={closeMenu}>Book a consultation <ArrowUpRight size={15} /></a></nav><button className="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></header>

    <main id="top">
      <section className="hero-section">
        <WaterHero />
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-left-enter" style={{ "--i": 0 } as CSSProperties}><span className="eyebrow-line" /> Islamabad HQ · Lahore Office · Serving Nationwide</p>
          <h1 aria-label="The architecture of water."><span className="hero-line" aria-hidden="true"><span className="hero-left-enter" style={{ "--i": 1 } as CSSProperties}>The architecture</span></span><span className="hero-line" aria-hidden="true"><span className="hero-left-enter" style={{ "--i": 2 } as CSSProperties}>of <i>water.</i></span></span></h1>
          <p className="hero-lede hero-left-enter" style={{ "--i": 3 } as CSSProperties}>Bespoke swimming pools, landscapes, and water features for homes, hotels, and places worth arriving at.</p>
          <div className="hero-actions hero-left-enter" style={{ "--i": 4 } as CSSProperties}><a className="button button-light" href="#contact">Book a design consultation <ArrowUpRight size={16} /></a><a className="button button-ghost" href="#work">See our work <ArrowDownRight size={16} /></a></div>
        </div>
        <div className="hero-bottom hero-right-enter" style={{ "--i": 3 } as CSSProperties}><span>Move across the water</span><span className="hero-bottom-rule" /><ArrowDownRight size={17} /></div>
      </section>

      <section className="proof-bar" data-reveal>
        <div><strong>HQ</strong><span>Islamabad<br />Headquarters</span></div>
        <div><strong>LHR</strong><span>Lahore<br />Branch Office</span></div>
        <div><strong>PK</strong><span>Nationwide<br />All Pakistan</span></div>
        <div className="proof-note"><ShieldCheck size={19} /><span>Turnkey design,<br />build & care.</span></div>
      </section>

      <section className="intro-section" id="story" data-reveal><div className="section-kicker">A family-led practice in water art</div><div className="intro-content"><h2>We make the<br /><i>outside feel like home.</i></h2><div className="intro-text"><p>Asad Associates creates considered outdoor spaces across Islamabad. The practice brings pools, landscapes, and water features into one clear design-and-build conversation.</p><p>Our work is quiet but never ordinary: tactile stone, clear water, thoughtful planting, and the confidence to leave room for the sky.</p><a className="text-link" href="#contact">Discover our approach <ArrowUpRight size={16} /></a></div></div></section>

      <section className="signature-section" data-reveal><div className="signature-visual"><img src={courtyardImage} alt="A tranquil courtyard pool integrated into a modern home" /><div className="signature-label"><span>Beyond the pool</span><strong>01 / 03</strong></div></div><div className="signature-copy"><div className="section-kicker">A complete outdoor-living practice</div><h2>Where design,<br /><i>water & landscape meet.</i></h2><p>Inspired by the precision of luxury pool design and grounded in Islamabad's landscape, we create spaces that feel inevitable — as if the architecture, water, and garden were always meant to belong together.</p><div className="signature-list"><div><span>Indoor wellness</span><small>Calm, private spaces for everyday restoration.</small></div><div><span>Outdoor living</span><small>Pool gardens made for long afternoons and late light.</small></div><div><span>Water art</span><small>Fountains and waterfalls with a sense of theatre.</small></div></div></div></section>

      <section className="services-section" id="services" data-reveal><div className="section-heading"><div><div className="section-kicker">What we do</div><h2>Built around<br /><i>the water.</i></h2></div><p>Every project starts with how you want to feel in the space. We bring the technical depth and the visual restraint to make that feeling last.</p></div><div className="services-grid">{services.map(({ number, icon: Icon, title, text, href }) => <article className="service-card" key={title}><div className="service-top"><span className="service-number">{number}</span><Icon size={25} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p><Link href={href} aria-label={`Learn more about ${title}`}><ChevronRight size={18} /></Link></article>)}</div></section>

      <WorkShowcase />

      <section className="feature-section" data-reveal><div className="feature-image"><img src={waterfallImage} alt="Illustrative architectural waterfall concept beside a pool" /><div className="image-caption">Illustrative concept direction · not a completed project claim</div></div><div className="feature-copy"><div className="section-kicker">The Asad difference</div><h2>Good design is<br /><i>felt in the details.</i></h2><p>Our team brings a builder's eye to every beautiful idea. We think through circulation, filtration, finishes, planting, lighting, and the way a space changes from morning to evening.</p><ul>{["One thoughtful team from design through maintenance", "Materials and systems selected for Islamabad's climate", "Clear communication, careful execution, lasting value"].map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><a className="text-link" href="#contact">See how we work <ArrowUpRight size={16} /></a></div></section>

      <section className="process-section" id="process" data-reveal><div className="section-heading"><div><div className="section-kicker">From first sketch to first swim</div><h2>A clearer way<br /><i>to create.</i></h2></div><p>Big projects feel better when the process is clear. Our team stays close from the first conversation through the final handover.</p></div><div className="process-grid">{process.map(({ number, icon: Icon, title, text }) => <article className="process-card" key={title}><div className="process-icon"><Icon size={22} strokeWidth={1.4} /></div><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="projects-section" id="projects" data-reveal><div className="section-heading projects-heading"><div><div className="section-kicker">Concept studies</div><h2>Directions for<br /><i>a sense of place.</i></h2></div><a className="text-link" href="#contact">Discuss your project <ArrowUpRight size={16} /></a></div><p className="media-disclosure">Illustrative architectural directions shown for design discussion. These images are not presented as completed Asad Associates projects.</p><div className="project-filters" aria-label="Filter concept directions">{filters.map(filter => <button type="button" className={activeFilter === filter ? "is-active" : ""} key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}</div><div className="projects-grid">{visibleProjects.map(project => <article className={`project-card ${project.className}`} key={project.title}><img src={project.image} alt={`Illustrative concept: ${project.title}`} /><div className="project-overlay"><div><span>{project.tag}</span><h3>{project.title}</h3><small>{project.location}</small></div><ArrowUpRight size={21} /></div></article>)}</div></section>

      <section className="quote-section" data-reveal><Quote size={35} strokeWidth={1} /><blockquote>“The best outdoor spaces do not compete with the architecture. They make the whole place feel more considered.”</blockquote><div className="quote-rule" /><span>Asad Associates · Design principle</span></section>

      <section className="location-section" id="location" data-reveal>
        <LocationMap />
        <div className="location-copy">
          <div className="section-kicker">Presence across Pakistan</div>
          <h2>Islamabad HQ.<br /><i>Lahore Office.</i></h2>
          <p>
            From our Islamabad engineering headquarters and Lahore regional studio, we deliver bespoke water architecture, swimming pools, and resort landscapes across all of Pakistan.
          </p>
          <div className="location-card">
            <span><span className="location-dot" /> Headquarters</span>
            <strong>Islamabad Office & Demo Yard</strong>
            <small>Main Rawal Dam Chowk, Park Road, Islamabad</small>
          </div>
          <div className="location-card" style={{ marginTop: "12px" }}>
            <span><span className="location-dot" /> Regional Studio</span>
            <strong>Lahore Branch Office</strong>
            <small>Serving Punjab & Central Region projects</small>
          </div>
          <div className="location-card" style={{ marginTop: "12px" }}>
            <span><span className="location-dot" /> Nationwide Footprint</span>
            <strong>Serving All Major Cities</strong>
            <small>Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Abbottabad, Mirpur & nationwide estates</small>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=Main+Rawal+Dam+Chowk+Park+Road+Islamabad+Pakistan" target="_blank" rel="noreferrer">
              <MapPin size={15} /> Open Islamabad HQ in Maps <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="cta-strip" data-reveal><div><span className="section-kicker">A better outside starts with one conversation</span><h2>Let’s shape<br /><i>your water story.</i></h2></div><a className="button button-dark" href="#contact">Plan your project <ArrowUpRight size={16} /></a></section>

      <section className="contact-section" id="contact" data-reveal>
        <div className="contact-copy">
          <div className="section-kicker light-kicker">Let's make room for more</div>
          <h2>Have a space<br /><i>in mind?</i></h2>
          <p>Tell us a little about your property. Our hydraulic engineering and design teams will review your project.</p>
          
          <div className="contact-details">
            <a href="tel:+923225079070"><Phone size={17} />+92 322 5079070</a>
            <a href="mailto:hello@asadassociates.com"><Mail size={17} />hello@asadassociates.com</a>
            <a href="https://wa.me/923225079070?text=Hello%20Asad%20Associates%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer">
              <MessageCircle size={17} />WhatsApp Direct: +92 322 5079070
            </a>

            <div className="flex flex-col gap-2 pt-2 border-t border-teal-900/10 text-xs">
              <span className="flex items-center gap-2 font-medium text-teal-950">
                <Building2 size={15} className="text-teal-700" />
                <strong>HQ:</strong> Main Rawal Dam Chowk, Park Road, Islamabad
              </span>
              <span className="flex items-center gap-2 font-medium text-teal-950">
                <Building2 size={15} className="text-teal-700" />
                <strong>Office:</strong> Lahore Branch, Punjab
              </span>
              <span className="flex items-center gap-2 text-teal-800">
                <Globe2 size={15} className="text-teal-700" />
                <strong>Coverage:</strong> Executing Turnkey Projects All Over Pakistan
              </span>
            </div>

            {/* Social media connections */}
            <div className="flex items-center gap-4 pt-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-teal-900/60">Follow Us:</span>
              <a
                href="https://www.facebook.com/share/1HQkqHLqPk/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/70 hover:bg-white text-teal-950 text-xs font-medium border border-teal-800/15 transition-all shadow-xs"
                title="Follow Asad Associates on Facebook"
              >
                <Facebook size={14} className="text-blue-600" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/hamiddardarboys?rpxt=d3h1aTdzYzJwa3pp"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/70 hover:bg-white text-teal-950 text-xs font-medium border border-teal-800/15 transition-all shadow-xs"
                title="Follow on Instagram"
              >
                <Instagram size={14} className="text-pink-600" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="inquiry-card"><ProjectBrief /></div>
      </section>
    </main>

    <footer className="site-footer">
      <div>
        <Brand footer />
        <p className="mt-3">
          Landscapes, pools & water art<br />for a life lived outside.
        </p>
        <p className="text-xs text-sand/60 mt-2 font-mono">
          HQ: Islamabad · Branch: Lahore · Operating Nationwide
        </p>
      </div>

      <div className="footer-links">
        <a href="/#services">Expertise</a>
        <a href="/#process">Process</a>
        <a href="/#projects">Concepts</a>
        <a href="/#location">Offices</a>
        <a href="/#contact">Contact</a>
        <a href="/privacy">Privacy policy</a>
        <a href="/sitemap">Sitemap</a>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300">Connect With Us</span>
        <a
          href="https://www.facebook.com/share/1HQkqHLqPk/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-sand/80 hover:text-white transition-colors"
        >
          <Facebook size={15} className="text-blue-400" />
          <span>Facebook Page</span>
        </a>
        <a
          href="https://www.instagram.com/hamiddardarboys?rpxt=d3h1aTdzYzJwa3pp"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-sand/80 hover:text-white transition-colors"
        >
          <Instagram size={15} className="text-pink-400" />
          <span>Instagram @hamiddardarboys</span>
        </a>
        <a
          href="https://wa.me/923225079070"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-sand/80 hover:text-white transition-colors"
        >
          <MessageCircle size={15} className="text-emerald-400" />
          <span>WhatsApp (+92 322 5079070)</span>
        </a>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Asad Associates · Islamabad HQ & Lahore Office</span>
        <span>Nationwide Water Architecture & Engineering</span>
      </div>
    </footer>


  </div>;
}
