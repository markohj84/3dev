import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const casos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casos' }),
  schema: z.object({
    title:        z.string(),
    client:       z.string(),
    industry:     z.string(),
    year:         z.number(),
    duration:     z.string(),
    stack:        z.array(z.string()),
    ai:           z.array(z.string()),
    team:         z.number(),
    siteUrl:      z.string().optional(),
    tags:         z.array(z.enum(['brand', 'product', 'ai'])),
    featured:     z.boolean().default(false),
    description:  z.string().optional(),

    metrics: z.array(z.object({
      label:  z.string(),
      value:  z.string(),
      accent: z.boolean().default(false),
      desc:   z.string().optional(),
    })),

    // Act 01 — El reto
    challengeTitle: z.string().optional(),
    challengeLead:  z.string().optional(),
    challengeBody:  z.array(z.string()).optional(),

    // Act 02 — La solución
    solutionTitle:  z.string().optional(),
    solutionLead:   z.string().optional(),
    solutionBlocks: z.array(z.object({
      tag:   z.string(),
      title: z.string(),
      desc:  z.string(),
    })).optional(),

    // Act 03 — Resultados
    resultsTitle:   z.string().optional(),
    resultsContext: z.string().optional(),

    // Gallery
    galleryItems: z.array(z.object({
      label: z.string(),
      wide:  z.boolean().default(false),
    })).optional(),

    // Stack table
    stackTable: z.array(z.object({
      label: z.string(),
      items: z.array(z.string()),
    })).optional(),

    testimonial: z.object({
      quote:    z.string(),
      name:     z.string(),
      role:     z.string(),
      initials: z.string(),
    }).optional(),

    draft: z.boolean().default(false),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title:   z.string(),
    date:    z.date(),
    tag:     z.enum(['brand', 'product', 'ai']),
    summary: z.string(),
    draft:   z.boolean().default(false),
  }),
});

export const collections = { casos, insights };
