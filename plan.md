# Asad Associates — Trust-first design-build roadmap

## Approved direction

Implement the attached client recommendations in controlled phases while preserving the existing React 19, TypeScript, Vite, and static hosting foundation. The immediate release prioritizes credibility, clear content, prepared visual states, lightweight interaction, and qualified inquiries. It must not imply that illustrative/reference imagery is completed Asad Associates work, and it must not claim that a static front-end form is a delivered CRM or lead endpoint.

## Design movement

1. Architectural editorial minimalism — probability 0.06.
2. Luxury resort showroom — probability 0.02.
3. Technical dark configurator — probability 0.04.

Chosen direction: architectural editorial minimalism with a restrained technical “Explore the elements of water” panel.

## Core principles

- Verified-first communication: separate illustrative concept media from authentic company evidence.
- One memorable interaction: a lightweight prepared-state water concept explorer, not full real-time 3D.
- Lead clarity: a short two-step project brief plus direct email, phone, and WhatsApp fallbacks.
- Performance by default: poster-first hero video, reduced motion, accessible controls, and no new heavy runtime dependency.

## Color philosophy

Keep the existing deep teal, mineral green, cream, stone, and aqua palette. Use the dark configurator treatment only for the concept explorer so it feels like a deliberate design tool rather than a second visual identity.

## Layout paradigm

Use asymmetric editorial sections, fine rules, offset image frames, and service landing pages with one clear conversion path. Dedicated service pages are text-first and include honest media labels.

## Brand essence and voice

Asad Associates is a family-led Islamabad outdoor-living design-and-build practice for clients who want pools, landscapes, fountains, and care handled with architectural restraint. Personality: considered, tactile, dependable. Headlines should be calm and specific; CTAs should invite a real project conversation rather than promise an instant result.

## Implementation

- Add `ProjectBrief` as a two-step, static-safe lead capture component with service choice, property type, location, timing, contact details, optional file selection, validation, and direct email/WhatsApp fallback actions.
- Add dedicated service routes for pools, fountains/waterfalls, landscape design, and care/maintenance with unique crawlable headings and content.
- Reframe current portfolio imagery as clearly labeled illustrative concept direction until authentic project photography is supplied.
- Reframe the configurator as “Explore the elements of water” and clearly disclose that its states are illustrative design directions, not final engineering or proof of completed work.
- Add direct WhatsApp CTA and service-specific WhatsApp handoff from the project brief.
- Keep video poster fallback and reduce decorative motion where possible; retain reduced-motion support.
- Update the route manifest, sitemap page, and static crawler files for the service routes.

## Project structure

- `client/src/pages/Home.tsx`: homepage, trust narrative, concept explorer placement, project direction labels.
- (Removed) `Configurator.tsx` / `Configurator3D.tsx`: the pool and fountain configurator section was taken out of the site.
- `client/src/components/ProjectBrief.tsx`: two-step qualification and fallback contact actions.
- `client/src/pages/ServicePage.tsx`: shared service landing page renderer.
- `client/public/`: route manifest, sitemap, robots, and durable media.
- `plan.md` / `TODO.md`: approved roadmap and acceptance evidence.

## Constraints and open dependencies

A real server-side inquiry endpoint, upload storage, notifications, lead log, analytics provider, exact office address, verified claims, and authentic project photography require client-approved destinations, credentials, or source material. The release will expose honest fallbacks and clearly identify those dependencies rather than inventing delivery or evidence.
