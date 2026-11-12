export const SITE = {
  name: "Asad Associates",
  email: "hamiddarboys@gmail.com",
  phone: "+92 322 5079070",
  whatsappNumber: "923225079070",
  facebookUrl: "https://www.facebook.com/share/1HQkqHLqPk/",
  instagramUrl: "https://www.instagram.com/hamiddardarboys?rpxt=d3h1aTdzYzJwa3pp",
  city: "Islamabad, Pakistan",
  hqCity: "Islamabad (Headquarters)",
  branchCity: "Lahore (Regional Office)",
  coverage: "Nationwide Execution across Pakistan",
  analyticsEnabled: false,
  defaultTitle: "Asad Associates — Landscapes, pools & water art",
  defaultDescription: "Asad Associates designs swimming pools, landscapes, fountains, waterfalls, and outdoor living spaces across Pakistan.",
} as const;

export const whatsappUrl = (message: string) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
