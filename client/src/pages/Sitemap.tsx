import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const links = [{ label: "Home", href: "/" }, { label: "Swimming pools", href: "/services/swimming-pools" }, { label: "Fountains & waterfalls", href: "/services/fountains-waterfalls" }, { label: "Landscape design", href: "/services/landscape-design" }, { label: "Care & maintenance", href: "/services/care-maintenance" }, { label: "Our story", href: "/#story" }, { label: "Concept directions", href: "/#projects" }, { label: "Start a project", href: "/#contact" }, { label: "Privacy policy", href: "/privacy" }];

export default function Sitemap() {
  useEffect(() => { document.title = "Sitemap — Asad Associates"; return () => { document.title = "Asad Associates — Landscapes, pools & water art"; }; }, []);
  return <main className="legal-page sitemap-page"><a className="legal-back" href="/"><ArrowLeft size={16} /> Back to Asad Associates</a><div className="legal-hero"><span className="section-kicker">Find your way around</span><h1>Site<br /><i>map.</i></h1><p>Explore Asad Associates.</p></div><div className="sitemap-links">{links.map(link => <a href={link.href} key={link.href}><span>{link.label}</span><ArrowUpRight size={18} /></a>)}</div></main>;
}
