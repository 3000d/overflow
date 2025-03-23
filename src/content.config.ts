import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string().optional(),
      artists: z.array(z.string()),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      schedule: z.string(),
      cover: image(),
      artistWebsite: z.string().url().optional(),
      ticket: z.string().url().optional(),
    }),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subname: z.string().optional(),
      cover: image(),
      links: z.array(z.object({ url: z.string().url(), label: z.string() })).optional(),
      events: z.array(reference('events')),
    }),
});

export const collections = { events, artists };
