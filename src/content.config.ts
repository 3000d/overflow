import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';
import { toDate } from 'date-fns-tz';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string().optional(),
      cycle: z.string().optional(),
      artists: z.array(z.string()).optional(),
      endDate: z.date().transform((date) => {
        const floatingDateStr = date.toISOString().replace('Z', '');
        return toDate(floatingDateStr, { timeZone: 'Europe/Brussels' });
      }),
      startDate: z.date().transform((date) => {
        const floatingDateStr = date.toISOString().replace('Z', '');
        return toDate(floatingDateStr, { timeZone: 'Europe/Brussels' });
      }),
      schedule: z.string().optional(),
      recurring: z.string().optional(),
      cover: image().optional(),
      artistWebsite: z.string().url().optional(),
      ticket: z.string().url().optional(),
      free: z.boolean().optional(),
      embedTicketForm: z.boolean().optional(),
      featured: z.boolean().optional(),
      featureCover: image().optional(),
      programme: z.array(reference('events')).optional(),
      programmeIntro: z.string().optional(),
    }),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subname: z.string().optional(),
      cover: image(),
      links: z
        .array(z.object({ url: z.string().url(), label: z.string() }))
        .optional(),
      events: z.array(reference('events')),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image().optional(),
      description: z.string().optional(),
    }),
});

export const collections = { events, artists, articles };
