import { SITE } from "./site";

export function setPageMeta(title: string = SITE.defaultTitle, description: string = SITE.defaultDescription, path = "/") {
  if (typeof document === "undefined") return;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${window.location.origin}${path}`);
}
