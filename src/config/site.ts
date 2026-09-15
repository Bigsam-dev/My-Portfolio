const configuredSiteUrl = import.meta.env.PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');

export const siteConfig = {
  siteName: 'SAMDIGITALS',
  defaultTitle: 'SAMDIGITALS — AI Automation, CRM & Web Systems',
  defaultDescription: 'AI automation, CRM infrastructure, custom web apps, and conversion-focused websites built around real business operations.',
  siteUrl: configuredSiteUrl || undefined,
  author: 'SAMDIGITALS',
  defaultSocialImage: '/og-default.png',
  themeColor: '#071426',
  contact: {
    email: import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || undefined,
    linkedIn: import.meta.env.PUBLIC_LINKEDIN_URL?.trim() || undefined,
    bookingUrl: import.meta.env.PUBLIC_BOOKING_URL?.trim() || undefined,
  },
} as const;

export const absoluteSiteUrl = (path = '/') => {
  if (!siteConfig.siteUrl) return undefined;
  return new URL(path, `${siteConfig.siteUrl}/`).toString();
};
