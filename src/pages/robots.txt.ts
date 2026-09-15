import type {APIRoute} from 'astro';
import {absoluteSiteUrl} from '../config/site';

export const GET:APIRoute=()=>{
  const sitemap=absoluteSiteUrl('/sitemap.xml')||'/sitemap.xml';
  return new Response(`User-agent: *\nAllow: /\nDisallow: /studio/\n\nSitemap: ${sitemap}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
