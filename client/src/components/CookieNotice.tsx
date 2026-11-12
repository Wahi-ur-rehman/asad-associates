import { Cookie } from "lucide-react";
import { SITE } from "@/lib/site";
import { getStored, setStored } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(SITE.analyticsEnabled && !getStored("asad-cookie-consent")); }, []);
  if (!visible) return null;
  return <aside className="cookie-panel" role="dialog" aria-label="Cookie consent"><div className="cookie-icon"><Cookie size={19} /></div><div><strong>Cookies, thoughtfully used.</strong><p>Optional analytics help us understand what visitors explore. Nothing is enabled without your choice.</p><a href="/privacy">Read our privacy policy</a></div><div className="cookie-actions"><button className="cookie-accept" onClick={() => { setStored("asad-cookie-consent", "accepted"); setVisible(false); }}>Accept</button><button className="cookie-dismiss" onClick={() => setVisible(false)}>Not now</button></div></aside>;
}
