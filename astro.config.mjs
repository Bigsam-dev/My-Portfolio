// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
const configuredSite = process.env.PUBLIC_SITE_URL?.trim();

// https://astro.build/config
export default defineConfig({
  site: configuredSite || undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});
