import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(), slug: z.string(), client: z.string().optional(), industry: z.string(), category: z.string(),
    status: z.enum(['delivered', 'in-progress', 'ongoing', 'architecture', 'concept']).optional(),
    summary: z.string(), featured: z.boolean().default(false), order: z.number().int().positive(), year: z.number().int().optional(),
    role: z.string().optional(), timeline: z.string().optional(), services: z.array(z.string()).default([]), tech: z.array(z.string()).default([]),
    problem: z.string().optional(), businessContext: z.string().optional(), solution: z.string().optional(),
    system: z.array(z.string()).default([]), implementation: z.array(z.string()).default([]),
    cover: z.string().optional(), gallery: z.array(z.string()).optional(), workflow: z.array(z.string()).default([]),
    results: z.array(z.string()).optional(), testimonial: z.object({ quote: z.string(), attribution: z.string() }).optional(),
    visualType: z.enum(['telehealth', 'mortgage', 'attribution']), seoTitle: z.string(), seoDescription: z.string(),
  }),
});

const insights = defineCollection({
  loader: glob({ base: './src/content/insights', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(), slug: z.string(), category: z.string(), summary: z.string(),
    status: z.enum(['draft','published']).default('draft'), featured: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(), updatedAt: z.coerce.date().optional(),
    seoTitle: z.string(), seoDescription: z.string(),
  }),
});

export const collections = { projects, insights };
