# SAMDIGITALS Launch Checklist

## Domain and hosting

- [ ] Choose and confirm the production domain.
- [ ] Connect the domain to the selected hosting provider.
- [ ] Set `PUBLIC_SITE_URL` to the final HTTPS origin in the production build environment.
- [ ] Confirm the host applies the security policy in `public/_headers`, or translate it into the provider's header configuration.
- [ ] Run a production build with the final environment variables.
- [ ] Verify canonical, Open Graph, robots, and sitemap URLs use the final domain.

## Sanity publishing

- [ ] Add the production Sanity CORS origin if browser-based preview or visual editing requires it.
- [ ] Create a hosting-provider build hook.
- [ ] Configure a Sanity webhook to call that build hook after relevant documents are published or unpublished.
- [ ] Filter the webhook to `project`, `insight`, `technology`, `testimonial`, and `siteMedia` document changes.
- [ ] Test: publish a safe content edit, confirm a deployment starts, and verify the public site updates.

## Contact and ownership

- [ ] Verify the Formspree notification destination for form `xdeoaqvd`.
- [ ] Submit one genuine production inquiry and confirm validation, delivery, success, and failure handling.
- [ ] Add a real email, LinkedIn URL, or booking URL only if those destinations should be public.
- [ ] Review all project and representative screenshots for private or identifying data.
- [ ] Keep the withheld organizations/financial-data screenshot unpublished unless it is properly redacted.

## Measurement and final QA

- [ ] Decide whether analytics is needed and select a provider.
- [ ] If nonessential tracking is added, review privacy and consent requirements before launch.
- [ ] Verify the social preview in platform debugging tools.
- [ ] Verify favicon and Apple touch icon behavior.
- [ ] Complete a final mobile test on a physical device.
- [ ] Complete a final desktop test in current Chrome, Edge, Firefox, and Safari where available.
- [ ] Verify the 404 page on the production host.
- [ ] Go live.
