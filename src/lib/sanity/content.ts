import { getCollection } from "astro:content";
import { getSanityClient, isSanityConfigured } from "./client";
import {
  approvedTestimonialsQuery,
  caseStudyProjectsQuery,
  featuredInsightsQuery,
  featuredProjectsQuery,
  insightBySlugQuery,
  nextProjectQuery,
  projectBySlugQuery,
  publishedInsightsQuery,
  publicProjectsQuery,
  siteMediaQuery,
  technologiesQuery,
} from "./queries";
import { sanityCroppedImageSrcset, sanityCroppedImageUrl, sanityImageSrcset, sanityImageUrl } from "./image";
import type {
  CMSInsight,
  CMSProject,
  ProjectScreenshot,
  ProjectStatus,
  SanityImageRef,
  SiteMedia,
  Technology,
  Testimonial,
} from "./types";
const visualBySlug: Record<string, CMSProject["visualType"]> = {
  "sleep-performance-company": "telehealth",
  "citadel-home-loan": "mortgage",
  "gymfitout-dubai": "attribution",
};
const localProjects = async (): Promise<CMSProject[]> =>
  (await getCollection("projects"))
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data }) => ({
      _id: id,
      title: data.title,
      slug: data.slug,
      client: data.client,
      industry: data.industry,
      category: data.category,
      status: data.status as ProjectStatus | undefined,
      year: data.year,
      summary: data.summary,
      featured: data.featured,
      featuredOrder: data.order,
      order: data.order,
      visibility: "case-study",
      role: data.role,
      services: data.services,
      technologies: data.tech.map((name) => ({ name })),
      tech: data.tech,
      problem: data.problem,
      businessContext: data.businessContext,
      solution: data.solution,
      workflow: data.workflow,
      system: data.system,
      implementation: data.implementation.map((title, index) => ({
        order: index + 1,
        title,
      })),
      outcomes: data.results || [],
      metrics: [],
      testimonial: data.testimonial
        ? {
            quote: data.testimonial.quote,
            clientName: data.testimonial.attribution,
            approvedForPublication: true,
          }
        : undefined,
      coverUrl: data.cover,
      screenshots: (data.gallery || []).map((url, index) => ({
        image: {},
        url,
        altText: `${data.title} project interface`,
        displayStyle: "full-width",
        order: index + 1,
      })),
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      visualType: data.visualType,
      source: "local",
    }));
const normalizeProject = (project: Partial<CMSProject>): CMSProject =>
  ({
    ...project,
    status: project.status,
    featured: Boolean(project.featured),
    order: project.order || 999,
    visibility: project.visibility || "draft",
    services: project.services || [],
    technologies: project.technologies || [],
    tech: (project.technologies || []).map((item) => item.name),
    workflow: project.workflow || [],
    system: project.workflow || [],
    implementation: (project.implementation || []).sort(
      (a, b) => a.order - b.order,
    ),
    outcomes: project.outcomes || [],
    metrics: (project.metrics || []).filter((metric) => metric.verified),
    testimonial: project.testimonial?.approvedForPublication
      ? project.testimonial
      : undefined,
    coverUrl: sanityImageUrl(project.coverImage as never, 1600),
    coverSrcset: sanityImageSrcset(project.coverImage as never),
    screenshots: (project.screenshots || [])
      .sort((a, b) => (a.order || 999) - (b.order || 999))
      .map((item) => ({
        ...item,
        url: sanityImageUrl(
          item.image as never,
          item.displayStyle === "mobile" ? 720 : 1600,
        ),
        srcset: sanityImageSrcset(item.image as never, item.displayStyle === "mobile" ? [360, 540, 720] : [480, 768, 1200, 1600]),
      })),
    seoTitle: project.seoTitle || `${project.title} | SAMDIGITALS`,
    seoDescription: project.seoDescription || project.summary || "",
    visualType: visualBySlug[project.slug || ""] || "attribution",
    source: "sanity",
  }) as CMSProject;
async function projectsFrom(query: string) {
  if (!isSanityConfigured) return [];
  return (await getSanityClient().fetch<Partial<CMSProject>[]>(query)).map(
    normalizeProject,
  );
}
export async function getPublicProjects() {
  return isSanityConfigured
    ? projectsFrom(publicProjectsQuery)
    : localProjects();
}
export async function getFeaturedProjects() {
  return isSanityConfigured
    ? projectsFrom(featuredProjectsQuery)
    : (await localProjects()).filter((p) => p.featured).slice(0, 3);
}
export async function getCaseStudyProjects() {
  return isSanityConfigured
    ? projectsFrom(caseStudyProjectsQuery)
    : localProjects();
}
export async function getProjectBySlug(slug: string) {
  if (!isSanityConfigured)
    return (await localProjects()).find((project) => project.slug === slug);
  const project = await getSanityClient().fetch<Partial<CMSProject> | null>(
    projectBySlugQuery,
    { slug },
  );
  return project ? normalizeProject(project) : undefined;
}
export async function getNextProject(order: number) {
  if (!isSanityConfigured) {
    const projects = await localProjects();
    return projects.find((project) => project.order > order) || projects[0];
  }
  const project = await getSanityClient().fetch<Partial<CMSProject> | null>(
    nextProjectQuery,
    { order },
  );
  return project
    ? normalizeProject(project)
    : (await projectsFrom(caseStudyProjectsQuery))[0];
}
const normalizeInsight = (item: Partial<CMSInsight>): CMSInsight =>
  ({
    ...item,
    seoTitle: item.seoTitle || `${item.title} | SAMDIGITALS`,
    seoDescription: item.seoDescription || item.summary || "",
    source: "sanity",
  }) as CMSInsight;
export async function getPublishedInsights() {
  if (!isSanityConfigured) return [];
  return (
    await getSanityClient().fetch<Partial<CMSInsight>[]>(publishedInsightsQuery)
  ).map(normalizeInsight);
}
export async function getFeaturedInsights() {
  if (!isSanityConfigured) return [];
  return (
    await getSanityClient().fetch<Partial<CMSInsight>[]>(featuredInsightsQuery)
  ).map(normalizeInsight);
}
export async function getInsightBySlug(slug: string) {
  if (!isSanityConfigured) return undefined;
  const item = await getSanityClient().fetch<Partial<CMSInsight> | null>(
    insightBySlugQuery,
    { slug },
  );
  return item ? normalizeInsight(item) : undefined;
}
export async function getSiteMedia(): Promise<SiteMedia | undefined> {
  if (!isSanityConfigured) return undefined;
  const media = await getSanityClient().fetch<
    | (Record<string, SanityImageRef> & {
        representativeProof?: ProjectScreenshot[];
      })
    | null
  >(siteMediaQuery);
  if (!media) return undefined;
  const map = (image?: SanityImageRef, aspectRatio?: number) =>
    image
      ? {
          image,
          url: aspectRatio ? sanityCroppedImageUrl(image as never, 1120, Math.round(1120/aspectRatio)) : sanityImageUrl(image as never, 1200),
          srcset: aspectRatio ? sanityCroppedImageSrcset(image as never, aspectRatio) : sanityImageSrcset(image as never, [480,768,1200]),
          altText: image.altText,
        }
      : undefined;
  return {
    portrait: map(media.portrait),
    workingPhoto: map(media.workingPhoto),
    secondaryPhoto: map(media.secondaryPhoto, 1),
    representativeProof: (media.representativeProof || [])
      .sort((a, b) => (a.order || 999) - (b.order || 999))
      .map((item) => ({
        ...item,
        url: sanityImageUrl(
          item.image as never,
          item.displayStyle === "detail-crop" ? 1000 : 1600,
        ),
        srcset: sanityImageSrcset(item.image as never, item.displayStyle === "detail-crop" ? [480, 768, 1000] : [480, 768, 1200, 1600]),
      })),
  };
}
export async function getTechnologies(): Promise<Technology[]> {
  return isSanityConfigured
    ? getSanityClient().fetch<Technology[]>(technologiesQuery)
    : [];
}
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  return isSanityConfigured
    ? getSanityClient().fetch<Testimonial[]>(approvedTestimonialsQuery)
    : [];
}
export { isSanityConfigured };
