# SAMDIGITALS CMS Guide

Sanity manages portfolio and insight content. Astro continues to control the website design.

## Add a project

1. Open Sanity Studio from the `studio` folder.
2. Open **Content → Projects**.
3. Choose **New Project**.
4. Add the title, category, truthful status, and slug.
5. Add the short summary.
6. Add a cover image and meaningful alt text when one is available.
7. Add screenshots, captions, alt text, and a display style.
8. Reference the technologies used.
9. Choose the visibility: Draft, Card only, or Full case study.
10. Enable Featured and set Featured order when the project belongs on the homepage.
11. Review every image for private or identifying information.
12. Publish when the public content is ready.

## Visibility choices

- **Draft:** private; it does not appear on the public website.
- **Card only:** appears on `/work`, but does not link to an incomplete case-study page.
- **Full case study:** appears on `/work` and receives a detailed `/work/[slug]/` page.

## Screenshot display styles

- **Full width:** a large editorial image.
- **Browser frame:** restrained browser chrome around the image.
- **Dashboard:** a contained presentation suited to dense interfaces.
- **Mobile:** a narrow mobile proportion without oversized fake hardware.
- **Split:** pairs naturally with another split image on wider screens.
- **Detail crop:** emphasizes a closer interface detail.

The screenshot remains the evidence. Avoid unnecessary device mockups.

## Privacy review

Before publishing any screenshot, check for email addresses, phone numbers, customer or lead records, patient or health information, banking information, credentials, API keys, access tokens, internal notes, private IDs, and other personally identifiable information.

## Outcomes, metrics, and testimonials

- Add qualitative outcomes only when they are factually supported.
- Numerical metrics appear publicly only when **Verified** is enabled.
- Publish testimonials only when the client has granted permission and **Approved for publication** is enabled.

## Insights

Create entries under **Content → Insights**. Portable Text supports paragraphs, H2/H3 headings, lists, blockquotes, links, code blocks, and images. Only entries with status **Published** receive public routes. Drafts remain private.

## Profile media

Use **Media / Profile** for real portrait and working photographs. Do not upload generated people or unlicensed stock imagery. The About page retains its current abstract visual until a real portrait is available.

The current Profile Media record uses:

- **Primary / workspace portrait:** homepage About preview and About hero.
- **Working / supporting portrait:** one supporting placement on About.
- **Compact headshot:** reserved for compact author/profile contexts.
- **Representative CRM / automation proof:** reusable general samples for the homepage Proof section and Services page.

Representative proof must be labeled as general implementation evidence. Never attach it to a named project unless its attribution has been verified. The current Zoho custom-function screenshot is representative; it does not belong to the three published case studies.

The Zoho Accounts screenshot is currently withheld because it includes organization names and credit-limit data. The supplied dormancy workflow file is invalid and should be replaced with a valid, privacy-reviewed export before use.

## What happens after Publish

The Astro website is statically generated. The production update path is:

Sanity edit → Publish → Sanity webhook → hosting build hook → Astro rebuild → updated website.

Publishing makes content available to the next build; it does not update an already-generated deployment by itself. Automatic webhook delivery is not configured yet because no hosting provider or build-hook URL has been selected.

After hosting is selected:

1. Create a deploy/build hook in the hosting provider.
2. Create a Sanity webhook for the production dataset that calls that URL.
3. Trigger on create, update, and delete events for `project`, `insight`, `technology`, `testimonial`, and `siteMedia` documents. If the provider supports a GROQ filter, use `_type in ["project", "insight", "technology", "testimonial", "siteMedia"]`.
4. Store the hook URL only in Sanity/hosting configuration; do not commit it.
5. Publish a harmless test edit and confirm the deployment and public result.

## Current live configuration

The site is connected to Sanity project `flpzrgcs`, public dataset `production`. The three approved project records and their referenced Technology records have been migrated and verified. Whenever Sanity is configured, it is the only public project source; the local content files are retained solely as an unconfigured-development fallback.

Public project queries include only **Card only** and **Full case study** records. Draft projects are excluded. Local draft insight files are not publicly listed by the CMS-aware routes.

## Initial setup

1. Copy `.env.example` to `.env` if the local file is missing.
2. Use project ID `flpzrgcs`, dataset `production`, and API version `2026-08-31`.
3. Provide the same project ID and dataset values when running Studio.
4. The Studio development origin used by this project is `http://localhost:3333`.
5. Add `http://localhost:4321` as a permitted CORS origin only if browser-based preview features require it.
6. Add the eventual production origin after the real domain is known.

The production origin is not currently known. Set `PUBLIC_SITE_URL` in the hosting environment when it is chosen. Add that same HTTPS origin to Sanity CORS only when browser-based preview or visual editing needs it; public read-only static builds do not require browser CORS.

## Deployment and analytics status

- Hosting provider: not selected.
- Production domain: not supplied.
- Publish webhook/build hook: not configured.
- Analytics: intentionally not installed. Add a provider integration in `src/layouts/BaseLayout.astro` only after the owner selects one, and never send form field values to analytics.
- Cookie banner: not required while no nonessential tracking is installed.

No read token is required for a public dataset. Keep private tokens out of the repository.
