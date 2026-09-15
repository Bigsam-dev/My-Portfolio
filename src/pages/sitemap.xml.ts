import type {APIRoute} from 'astro';
import {absoluteSiteUrl} from '../config/site';
import {getCaseStudyProjects,getPublishedInsights} from '../lib/sanity/content';

const escapeXml=(value:string)=>value.replace(/[<>&'\"]/g,char=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[char]!));
export const GET:APIRoute=async()=>{
  const [projects,insights]=await Promise.all([getCaseStudyProjects(),getPublishedInsights()]);
  const routes=['/','/work/','/services/','/about/','/insights/','/contact/',...projects.map(item=>`/work/${item.slug}/`),...insights.map(item=>`/insights/${item.slug}/`)];
  const unique=[...new Set(routes)];
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(path=>`  <url><loc>${escapeXml(absoluteSiteUrl(path)||path)}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
