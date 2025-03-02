import { defineCollection, z } from 'astro:content';
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

export const collections = { events };
