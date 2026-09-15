# SAMDIGITALS Portfolio

## Product direction

SAMDIGITALS is a systems-focused portfolio for AI and business automation, CRM and revenue infrastructure, custom web applications and internal tools, conversion-focused websites, APIs, analytics, integrations, and operational systems.

Core positioning: **I Build the Systems Behind Growing Businesses.**

The public site uses Astro and TypeScript. Sanity is the authoritative CMS when configured, Formspree handles project inquiries, and client-side JavaScript is reserved for meaningful interaction such as the homepage system architecture.

## Final homepage architecture (Phase 7.5)

The homepage is a focused overview in this order:

1. Header
2. Hero with a compact, continuously looping software-logo marquee
3. Featured Work — up to three featured Sanity projects and a link to all work
4. Services Preview — four concise service areas and a link to the complete offer
5. Interactive System Architecture — the signature connected-business component
6. About Preview — real Sanity portrait, brief systems-first introduction, and About link
7. Final CTA — project inquiry and selected-work paths
8. Footer

Featured Work is the homepage's primary proof. The homepage does not repeat the full business-problem, process, project deep-dive, representative-proof, or Insights sections.

The hero marquee presents Zoho, GoHighLevel, Make, n8n, Zapier, Shopify, and Clio as restrained local SVG marks. Its duplicated visual sequence is hidden from assistive technology, the CSS-only loop pauses on hover, and reduced-motion mode converts it into a static wrapping list. APIs remain supporting capability copy rather than a fabricated software logo.

## Page responsibilities

- **Home:** positioning, strongest proof, concise offer, signature architecture, human introduction, and path forward.
- **Work:** complete portfolio index and truthful, content-driven case studies.
- **Services:** full offer, business-problem explanation, delivery process, and unattributed representative CRM/automation proof.
- **About:** systems philosophy, working principles, capabilities, process expectations, and human story.
- **Insights:** published thinking and articles; drafts are not publicly presented as completed work.
- **Contact:** accessible project inquiry powered by Formspree.

## Content and truth rules

- Projects, profile media, and representative proof remain CMS-delivered.
- Representative screenshots must never be attributed to a named client without evidence.
- Metrics render only when verified; testimonials render only with publication approval.
- Withhold media containing private, identifying, financial, health, credential, or internal information.
- Do not invent clients, results, dates, testimonials, articles, or project media.

## Responsive and accessibility rules

- Mobile-first, one-column layouts with approximately 20px gutters.
- Progressively enhance grids without fixed widths or horizontal page overflow.
- Preserve readable typography, 44px interactive targets, keyboard operation, visible focus, semantic structure, meaningful alt text, and reduced-motion behavior.
- Sanity images use responsive sources, dimensions, appropriate crop/hotspot data, and lazy loading outside priority hero media.

## Permanent responsive, accessibility, and motion standards

- Build intrinsically and mobile-first; never impose a minimum width on `html` or `body`.
- Support arbitrary viewport widths with fluid type, wrapping, `minmax()`, controlled containers, and content-driven breakpoints.
- Prefer `svh`/`dvh` over brittle `100vh` behavior and apply safe-area insets only at viewport edges where useful.
- Test portrait and landscape phones, portrait and landscape tablets, desktop, ultrawide, and browser zoom through 200%.
- Stress reusable components with unusually long CMS titles, labels, summaries, captions, and errors without changing production content.
- Target current Chromium, Firefox, Safari/WebKit, and Edge through standards-based CSS and progressive enhancement.
- Normal text must meet WCAG AA 4.5:1 contrast; large text and meaningful UI graphics must meet at least 3:1.
- All important controls retain visible keyboard focus and approximately 44×44px touch targets.
- Motion must be restrained, use transform/opacity where possible, never delay access to content, and never replace native scrolling.
- `prefers-reduced-motion: reduce` disables reveal movement, continuous particles, and nonessential transitions while preserving state changes.
- CMS content must wrap and reflow without assumptions about title, label, summary, caption, or metadata length.
- Run `scripts/responsive-qa.ps1` against a local server for repeatable overflow, oversized-element, route, and runtime-overlay checks.

## Current phase status

Phases 1–9 are implemented. The codebase is launch-prepared but has not been deployed.

## Production architecture (Phase 9)

- Astro remains a predominantly static frontend. Sanity Studio and React are not hydrated into public pages.
- Sanity project `flpzrgcs`, dataset `production`, supplies published projects, Insights, technologies, profile media, and representative proof at build time. Draft and non-public visibility filters remain enforced in GROQ.
- Formspree form `xdeoaqvd` receives project inquiries; inquiry contents are not sent to analytics or placed in URLs.
- `src/config/site.ts` is the single source for brand identity, the optional production origin, the default social image, and optional public contact destinations.
- `PUBLIC_SITE_URL` controls canonical, Open Graph, robots, and sitemap origins. It is intentionally unset until the real HTTPS domain is selected.
- Public pages provide unique titles and descriptions, Open Graph/X cards, a default branded social preview, modern favicons, truthful JSON-LD, robots directives, an automatically content-aware sitemap, and branded 404 handling.
- Sanity images use CDN format negotiation and responsive width candidates. Below-the-fold media remains lazy-loaded with reserved dimensions; the About hero portrait is eager/high priority because it can be an LCP candidate.
- Motion and responsive behavior follow the permanent Phase 8 standards, including reduced-motion fallbacks and the CSS-only software marquee.
- No analytics provider or cookie banner is installed. The integration point is `src/layouts/BaseLayout.astro` after the owner chooses a provider and reviews consent requirements.
- Provider-neutral security guidance is supplied in `public/_headers`; the selected host must support that format or receive equivalent header configuration.

## Production publishing requirements

The intended CMS update path is Sanity Publish → filtered webhook → hosting build hook → Astro rebuild → updated deployment. Hosting, the production domain, the build hook, and production CORS are owner actions still pending. See `CMS_GUIDE.md` and `LAUNCH_CHECKLIST.md`.
# Visual correction patch (September 2026)

- Render profile portraits from the uncropped Sanity asset at their natural height (`width: 100%; height: auto`) with the original top edge preserved. Never vertically center-crop a portrait or use a height cap that can remove hair, forehead, face, or shoulders; if a future fixed frame is unavoidable, anchor it at `50% 0%` so only the bottom may be cropped. Sanity hotspot metadata must never justify cropping the protected top edge.
- Prefer real, project-specific screenshots in project cards and case studies. If none exist, label architecture graphics as previews rather than implying they are screenshots.
- Representative CRM or automation proof must remain general and must never be attributed to Sleep Performance Company, Citadel Home Loan, or GymFitOut Dubai without explicit project attribution.
- The homepage platform marquee includes Zoho, GoHighLevel, Make, n8n, Zapier, Shopify, Clio, JobTread, and Brevo. JobTread and Brevo are also valid capability references on Services and About.
- Project media remains Sanity-first: cover and screenshot fields render real media automatically when editors add approved assets.

## Final brand color system

The production visual identity follows a bright, buyer-focused 60:30:10 balance:

- **60% cool white:** `#F7FAFF` with `#FFFFFF` surfaces for primary content, cards, Work, Services, About, Contact, Insights, articles, and proof.
- **30% royal blue:** `#155EEF`, supported by `#0B4FD6` and soft blue `#EAF1FF`, for heroes, final CTAs, navigation emphasis, active paths, links, and selected controls.
- **10% amber micro-accent:** `#FFB000`, reserved for small indicators and decorative data-flow details—not paragraphs, major headings, large buttons, or section backgrounds.

Supporting colors are ink `#0F172A`, secondary text `#526071`, muted text `#718096`, border `#DCE5F2`, dark-section blue `#0B1F3A`, and white `#FFFFFF`.

Section rhythm: royal-blue introduction; cool-white or white proof and business context; soft-blue service or implementation groups; dark blue only for intentional architecture/workflow contrast; royal-blue conversion CTA; dark-blue footer. The homepage remains Hero → Featured Work → Services Preview → Interactive Architecture → About Preview → Final CTA → Footer.
