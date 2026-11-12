export type WorkClip = {
  id: string;
  title: string;
  tag: string;
  category: "all" | "pool" | "fountain" | "waterfall";
  src: string;
  poster: string;
  alt: string;
  location: string;
};

export const workClips: WorkClip[] = [
  {
    id: "pool-lagoon",
    title: "Luxury Lagoon Pool & Spa",
    tag: "Vanishing Edge · Night Illumination",
    category: "pool",
    src: "/videos/proof-1.mp4",
    poster: "/videos/proof-1.jpg",
    alt: "Bespoke swimming pool installation in Islamabad villa with night LED illumination",
    location: "Islamabad Villa Residence",
  },
  {
    id: "waterfall-cascade",
    title: "Monolithic Rock Water Wall",
    tag: "Architectural Weir · Precision Flow",
    category: "waterfall",
    src: "/videos/proof-2.mp4",
    poster: "/videos/proof-2.jpg",
    alt: "Handcrafted stone rock waterfall installation with sheet spillway cascade",
    location: "Potohar Farmhouse Estate",
  },
  {
    id: "courtyard-jets",
    title: "Laminar Jumping Water Jets",
    tag: "Choreographed Arc · Submersible LEDs",
    category: "fountain",
    src: "/videos/proof-3.mp4",
    poster: "/videos/proof-3.jpg",
    alt: "Precision glass-rod laminar fountain jets jumping across garden water body",
    location: "Lahore Residence & Plaza",
  },
  {
    id: "marble-cascade",
    title: "Honed Marble Cascade Wall",
    tag: "Water Wall · Rawal Stone Basin",
    category: "waterfall",
    src: "/videos/marble-cascade.mp4",
    poster: "/videos/marble-cascade.jpg",
    alt: "A lit marble wall with a sheet of water falling into a dark stone basin",
    location: "Islamabad Sector F-7",
  },
  {
    id: "chroma-wall",
    title: "Colour-Choreographed Fountain",
    tag: "Water Wall · Dancing RGB Jets",
    category: "fountain",
    src: "/videos/chroma-wall.mp4",
    poster: "/videos/chroma-wall.jpg",
    alt: "A stone water wall with blue and amber lighting and illuminated fountain jets",
    location: "DHA Islamabad Estate",
  },
  {
    id: "neon-cascade",
    title: "Triple Weir Cascade & Jets",
    tag: "Multi-Tier · Architectural Cascade",
    category: "waterfall",
    src: "/videos/neon-cascade.mp4",
    poster: "/videos/neon-cascade.jpg",
    alt: "Backlit wall glowing in magenta and amber with three cascades and fountain jets",
    location: "Bahria Town Residence",
  },
];
