import { SITE } from "./site";
import { setStored } from "./storage";

export function track(name: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (!SITE.analyticsEnabled) return;
  const payload = { name, at: new Date().toISOString(), ...detail };
  window.dispatchEvent(new CustomEvent("asad:analytics", { detail: payload }));
  setStored(`asad-event-${name}`, payload.at);
}
