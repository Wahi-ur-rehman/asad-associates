import { MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";
import { track } from "@/lib/track";

export default function FloatingContact() {
  const message = "Hello Asad Associates, I would like to discuss a project.";
  return <>
    <div className="floating-contact" aria-label="Quick contact">
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { placement: "floating" })}><MessageCircle size={18} /> WhatsApp us</a>
    </div>
    <div className="mobile-contact-bar" aria-label="Quick contact">
      <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}><Phone size={16} /> Call</a>
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { placement: "mobile-bar" })}><MessageCircle size={16} /> WhatsApp</a>
    </div>
  </>;
}
