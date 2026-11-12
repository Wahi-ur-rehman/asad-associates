# Asad Associates Website

## Foundation, trust, and asset discipline

- [x] Preserve the existing React 19, TypeScript, Vite, and static hosting foundation rather than rebuilding the site unnecessarily.
- [x] Create an asset inventory separating the client-supplied logo, illustrative/reference media, generated concept film, and authentic company evidence still required.
- [x] Reframe image-led sections as concept directions and explicitly state that current imagery is not presented as completed Asad Associates work.
- [x] Keep the existing Islamabad, phone, email, and founding-year information visible while identifying exact business verification, office pin, claims, credentials, and authentic project media as launch dependencies.

## Premium visual refinement and prepared interaction

- [x] Preserve the architectural editorial direction with asymmetric layouts, fine rules, restrained motion, reduced-motion support, and a mobile-safe hero poster fallback.
- [x] Add dedicated crawlable service pages for swimming pools, fountains and waterfalls, landscape design, and care and maintenance.
- [x] Reframe the prior configurator as “Explore the elements of water,” a lightweight prepared-state concept explorer with clear disclosure that it is illustrative rather than final engineering or proof of completed work.
- [x] Replace completed-project portfolio language with concept-study language and filters for pool concept, water feature, and landscape direction.
- [x] Keep the hero video optional through a poster-first `preload="metadata"` implementation and label it as an illustrative concept film.

## Qualified inquiry flow

- [x] Replace the one-step visual form with a two-step guided project brief covering service, property type, location, timing, name, preferred contact, notes, and optional site-plan/reference-file selection.
- [x] Validate optional file size client-side at 10 MB and accept images or PDF references without pretending the static site has uploaded them to a server.
- [x] Add a confirmation state that prepares the brief for direct email or WhatsApp handoff, with event names for project-brief start, completion, form handoff, and WhatsApp click.
- [x] Add direct WhatsApp CTAs in the contact area and on each service landing page.
- [x] Add clear fallback language explaining that a real server-side endpoint, notification workflow, lead log, spam protection, and secure upload storage still require an approved provider or server destination.

## SEO and delivery

- [x] Update the route manifest, XML sitemap, sitemap page, and crawler documents for all core and service routes.
- [x] Keep important service content in crawlable semantic HTML rather than hiding it inside video, canvas, or animation.
- [x] Run `pnpm check` and `pnpm build:static` successfully.
- [x] Verify every core and service route plus robots, sitemap, and route-manifest assets over HTTP.
- [x] Browser-test the prepared-state pool/fountain interactions and the project-brief flow through completion, including the direct-send confirmation state.

## Explicit client dependencies before production claims

- [ ] Connect a trusted server-side or form-provider endpoint for submissions.
- [ ] Add verified email notification, lead log, spam protection, upload validation, and delivery-failure handling.
- [ ] Add consent-aware analytics and production event measurement after the client approves the provider.
- [ ] Replace illustrative/reference media with authentic project, construction, maintenance, team, and approved testimonial evidence.
- [ ] Verify the exact business address, map pin, phone, email, founding year, credentials, and any proof-bar claims before final publication.

Validation evidence: `pnpm check`, `pnpm build:static`, HTTP verification of `/`, all four `/services/*` routes, `/privacy`, `/sitemap`, `/robots.txt`, `/sitemap.xml`, and `/manus-routes.json`, plus desktop/mobile preview renders and live browser interaction checks completed successfully.

## Post-implementation release audit

- [x] Audit direct route refresh behavior, router coverage, route manifest, XML sitemap, robots file, runtime service metadata, and static SPA fallback behavior.
- [x] Test ProjectBrief validation, required fields, optional image/PDF file acceptance, 10 MB rejection, honest prepared-success state, approved email target, approved WhatsApp target, and absence of backend/network lead writes.
- [x] Integrate the supplied `Configurator3D.tsx` as an optional lazy-loaded Three.js prototype, blend it with the existing visual system, remove broken asset references, add concept disclosures, verify WebGL canvas mount, and add reduced-motion/resource cleanup safeguards.
- [x] Measure the audited preview with Lighthouse mobile and desktop presets, record LCP, FCP, TBT interaction proxy, CLS, bundle sizes, and significant asset sizes in `POST_IMPLEMENTATION_RELEASE_AUDIT.md`.
- [x] Record critical, high, medium, and low findings, completed fixes, remaining client dependencies, and a conditional no-go production recommendation in `POST_IMPLEMENTATION_RELEASE_AUDIT.md`.
- [ ] Complete physical iOS/Android testing and repeat Lighthouse on the final production domain.
- [ ] Connect and verify the approved server-side/form-provider lead endpoint, secure uploads, spam protection, notifications, and lead logging.
- [ ] Replace illustrative media and unverified business claims with client-approved evidence and exact contact/location information.

## CHANGES.md frontend package integration

- [x] Replace the frontend entry with static-first mounting; remove React Query/tRPC startup work from `main.tsx` while preserving server dependencies.
- [x] Add lazy-loaded secondary routes, shared layout chrome, skip link, guarded storage helpers, analytics gate, mobile contact bar, and desktop floating WhatsApp CTA.
- [x] Reorder the homepage fountain-first, add a “Recent water features” reel, add hero pause control, rename Portfolio to Concepts, remove the fake Instagram link, and change concept filters to `aria-pressed` buttons.
- [x] Add click-to-load map behavior, FAQs and related links on service pages, Service/FAQ/Breadcrumb JSON-LD, and unknown-service 404 handling.
- [x] Expand the guided brief with plot size, budget range, contact validation, concept-selection handoff, and explicit no-upload wording.
- [x] Add the requested default metadata and Google Fonts preconnect hints in `index.html`; remove the unused `add` package while keeping `three` and `@types/three`.
- [x] Preserve and extend the audited 3D configurator instead of overwriting it; guard its persistence and retain its existing cleanup/reduced-motion fixes.
- [x] Validate with `pnpm check`, `pnpm build:static`, HTTP route checks, live DOM checks, click-to-load map verification, concept-to-brief verification, and invalid-service 404 verification.
- [ ] Integrate the four client-supplied real MP4/WebM clips and approved originals when the missing `client/public/media/*` package is provided.
- [ ] Connect the approved real lead endpoint/form provider and prerender route-specific metadata for initial HTML.
