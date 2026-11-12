# Asad Associates — Post-Implementation Release Audit

**Audit date:** 20 October 2026  
**Scope:** Existing React 19 / TypeScript / Vite static website, trust-first roadmap, ProjectBrief, service routes, concept explorer, supplied Three.js configurator, hero media, SEO files, and contact handoffs.

## Executive recommendation

**Recommendation: NO-GO for final production launch, CONDITIONAL GO for stakeholder review and controlled preview.** The application builds cleanly, the routes render, the ProjectBrief produces honest direct-send handoffs, the supplied 3D prototype is now integrated as a lazy-loaded optional studio, and the site does not claim that enquiries are stored in a backend. However, final production should wait for verified business evidence and a real lead destination. Performance also needs another optimization pass, especially on mobile: the final Lighthouse mobile run scored **0.55 performance** with **FCP 10.7 s** and **LCP 22.0 s** on the preview origin. These preview numbers are not a substitute for a production-domain test, but they are too weak to call launch-ready.

## Verification conditions and limitations

Route and interaction checks used the managed Sandbox preview at `https://8328-ij6bs30ywrd5gg0myk9i8-561357aa.us3.manus.computer/`, direct HTTP requests against the local Vite static server, TypeScript diagnostics, Vite production builds, browser DOM inspection, and Lighthouse CLI. Lighthouse’s default run was treated as simulated mobile; the desktop run used `--preset=desktop`. No physical iOS or Android handset was available in this environment, so “real-device testing” remains open and must be completed on representative client devices and the production domain.

## Route-by-route report

| Route | Direct refresh / static response | Rendered content | Metadata | Result |
|---|---:|---|---|---|
| `/` | HTTP 200 from Vite static preview | Hero, services, concept studies, configurator, map, ProjectBrief, cookie panel | Homepage title, description, canonical and LocalBusiness JSON-LD present | Pass with performance follow-up |
| `/services/swimming-pools` | HTTP 200 | Service-specific heading, service points, WhatsApp CTA, illustrative-media disclosure | Runtime title, description, and canonical verified in browser | Pass |
| `/services/fountains-waterfalls` | HTTP 200 | Route is present in the router, route manifest, and XML sitemap | Uses the same runtime metadata pattern as the tested service route | Pass by code/manifest coverage; direct browser evidence should be repeated in production |
| `/services/landscape-design` | HTTP 200 | Route is present in the router, route manifest, and XML sitemap | Uses the same runtime metadata pattern as the tested service route | Pass by code/manifest coverage; direct browser evidence should be repeated in production |
| `/services/care-maintenance` | HTTP 200 | Route is present in the router, route manifest, and XML sitemap | Uses the same runtime metadata pattern as the tested service route | Pass by code/manifest coverage; direct browser evidence should be repeated in production |
| `/privacy` | HTTP 200 | Privacy policy, cookie explanation, business contact links | Runtime title added: “Privacy policy — Asad Associates” | Pass |
| `/sitemap` | HTTP 200 | Human-readable sitemap links | Runtime title added: “Sitemap — Asad Associates” | Pass |
| `/404` | HTTP 200 under Vite SPA fallback | NotFound component route exists | Not a sitemap entry by design | Pass for SPA fallback; confirm published host’s 404 behavior |
| `/robots.txt` | HTTP 200 | Crawler directives and XML sitemap pointer | Static file | Pass |
| `/sitemap.xml` | HTTP 200 | Seven indexable public URLs | Matches the intended public route set; excludes `/404` | Pass |
| `/manus-routes.json` | HTTP 200 | Eight route declarations including `/404` for the platform manifest | Valid JSON and synchronized with router | Pass |

The Vite preview returned the SPA shell for direct route requests, which confirms dev/static fallback behavior. Published static hosting must still be checked after publication because a generic static host without SPA fallback could return a server-level 404 on direct nested routes.

## ProjectBrief lead-capture test

The first step rendered four service choices and kept **Continue** disabled until a service was selected. Selecting “Swimming pool” changed the selected state and enabled Continue. The second step rendered five required fields: property type, timing, location, name, and preferred contact. The optional file input accepts images and PDF files; oversized files are rejected at 10 MB, the invalid selection is cleared, the error is shown, and the submit button is disabled while the error exists.

An audit-only test record was filled with non-production data and submitted locally. The success state said: “The static site does not pretend to have a CRM endpoint yet.” It then exposed a `mailto:hello@asadassociates.com` link and a WhatsApp link to `923225079070`. Browser resource inspection showed no form POST, API request, CRM write, or upload request; only the platform configuration script loaded. The flow therefore works as a prepared handoff, not as backend lead capture.

The email and WhatsApp actions were not activated during the audit, so no external message was sent. Their generated destinations were inspected and contained the selected brief data. The client must confirm that `hello@asadassociates.com` and `+92 322 5079070` are approved production contact details before launch.

## Supplied 3D configurator integration

`Configurator3D.tsx` is now included as an optional, lazy-loaded Three.js prototype. It is not loaded into the default homepage JavaScript path until the visitor chooses **Open optional 3D prototype**. The production build creates a separate `Configurator3D` chunk of approximately **588 KB minified / 147 KB gzip**. The 3D section is visually blended under the existing concept explorer, uses the existing mineral/teal direction, and keeps the lightweight pool/fountain explorer as the default experience.

The supplied component was audited and corrected in four places: missing `/assets/projects/*` image references were replaced with existing managed concept media; “Completed Reference” language was changed to “Illustrative concept direction”; the nonexistent `#enquiry-message` selector was replaced with clipboard plus local browser handoff and a `#contact` jump; and WebGL cleanup now disposes scene resources and loses the renderer context. The 3D animation loop respects `prefers-reduced-motion` and pauses when off-screen or when the document is hidden.

Live browser verification confirmed that the trigger changes `aria-expanded` to true, the lazy chunk loads, and a WebGL canvas mounts inside `#configurator-3d`. The prototype remains a visual conversation starter, not engineering output, a quotation engine, or evidence of completed company work.

## Accessibility and behavior review

Verified: semantic buttons for configurator choices, keyboard-capable native buttons and form controls, selected-state feedback, required form fields, descriptive image alt text, direct links for phone/email/WhatsApp, reduced-motion CSS for the main site, reduced-motion handling in the Three.js loop, and a visible cookie panel with stored preference.

Lighthouse reported accessibility **0.96**. Remaining automated warnings included an ARIA-role compatibility issue, a color-contrast issue, and a label-content-name mismatch. These should be corrected before final launch, although no keyboard trap or blocked primary CTA was observed in the manual DOM review.

## Performance measurements

| Condition | Performance | Accessibility | Best practices | SEO | FCP | LCP | INP / interaction proxy | CLS | Total transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Lighthouse simulated mobile, final run | 0.55 | 0.96 | 0.82 | 1.00 | 10.7 s | 22.0 s | 140 ms TBT | 0.007 | 5.05 MiB |
| Lighthouse desktop preset, final run | 0.70 | 0.96 | 0.81 | 1.00 | 1.8 s | 3.9 s | 0 ms TBT | 0.002 | 5.05 MiB |

Lighthouse did not provide a field measurement of INP for this static audit run; TBT is reported as the available lab interaction proxy. A browser-native preview sample before the final Lighthouse pass measured FCP 300 ms, CLS 0, and a provisional LCP 6.5 s, but it was taken against the managed preview and is not comparable to Lighthouse’s throttled run. Do not use it as a production performance claim.

Significant production assets are: hero MP4 **6,571,029 bytes**, main JS approximately **486 KB minified / 143 KB gzip**, optional 3D JS approximately **588 KB minified / 147 KB gzip**, and CSS approximately **138 KB minified / 25 KB gzip**. The hero film is now poster-first and deferred for 2.5 seconds; the final Lighthouse total dropped from approximately 11.5 MiB to approximately 5.05 MiB, but the simulated mobile LCP remained poor because preview latency and remote managed media remain material factors.

## Defect register

### Critical

No critical application defect was found in the audited code path. No payment, destructive action, account mutation, or backend data write is present.

### High priority

1. **Production lead capture is not connected.** ProjectBrief prepares email and WhatsApp handoffs but does not store, notify, upload, or log a lead. This is an intentional limitation, not a completed backend feature.
2. **Production evidence is incomplete.** Current project imagery and the hero film are labeled as illustrative or concept direction. Authentic completed-project photography, construction documentation, maintenance evidence, approved testimonials, and verified credentials remain required.
3. **Performance is not launch-ready on simulated mobile.** Final mobile Lighthouse performance is 0.55 with 22.0 s LCP. The hero video is deferred, but a production CDN/mobile rendition, compressed poster, and production-domain measurement are still required.
4. **Business verification is incomplete.** The exact office/studio address and map pin are not confirmed; the current map is centered on Islamabad. Phone and email also require client confirmation before publication.

### Medium priority

1. Lighthouse still reports color contrast, ARIA-role, and label-content-name warnings.
2. Runtime service metadata is correct after React hydration, but the initial static shell uses the homepage metadata for every nested route. If search indexing of route-specific metadata is critical, use a multi-page/static metadata strategy or server rendering.
3. The optional 3D chunk is intentionally large. It is lazy-loaded, but it should remain optional and should receive a real-device WebGL test on iOS Safari and Android Chrome.
4. The Vite build emits a warning for `/api/platform/config.js` lacking `type="module"`; this is platform bootstrap behavior and should be confirmed against the deployment contract rather than changed casually.

### Low priority

1. Lighthouse reports deprecated API and duplicate/unused JavaScript warnings inherited from the starter/UI dependency set.
2. Re-run the accessibility pass after replacing illustrative media and finalizing production contact copy.
3. Add a compact mobile poster rendition or responsive image strategy if the final hero film remains part of the launch experience.

## Fixes completed in this audit

- Added route-specific runtime document titles, descriptions, and canonical URLs for service routes.
- Added runtime titles for privacy and sitemap pages.
- Added the supplied Three.js 3D configurator as a lazy-loaded, visually blended optional prototype.
- Removed missing 3D image paths and misleading completed-project wording.
- Replaced the broken nonexistent enquiry textarea integration with an honest clipboard/contact handoff.
- Added WebGL resource disposal and reduced-motion behavior to the 3D prototype.
- Fixed oversized-file behavior in ProjectBrief so invalid optional files clear and block preparation.
- Deferred the 6.5 MB hero video and restored a visible poster fallback.
- Removed unverified founding-year/numeric business claims from public structured data and homepage proof content.
- Re-ran `pnpm check` and `pnpm build:static` successfully.

## Remaining client dependencies

Before production deployment, the client must provide or approve the exact business address and map pin; production phone, email, and WhatsApp details; authentic project media; approved testimonials and client names; verified founding year, credentials, awards, and numerical claims; the email/WhatsApp handling policy; a server-side or approved form provider endpoint; secure optional-file storage and validation; spam protection; notification and lead-log behavior; analytics provider and consent policy; and the final production domain for Lighthouse and real-device testing.

## Final release decision

**Do not represent this as fully production-ready yet.** It is suitable for client review, content approval, and controlled preview. Move to production only after the high-priority dependencies are resolved and a final audit on the production domain confirms acceptable mobile LCP, route refresh behavior, accessibility warnings, media delivery, and real-device WebGL behavior.
