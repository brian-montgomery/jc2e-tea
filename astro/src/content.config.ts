import { defineCollection, reference, z } from "astro:content";
import { glob } from 'astro/loaders';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { cardSchema, deckSchema } from "./lib/content";


const decks = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/decks" }),
  schema: deckSchema(),
});

const lawCards = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/content/cards/acts" }),
  schema: cardSchema({
    deckName: 'acts',
    extend: z.object({
      regions: z.array(z.string()).optional(),
    }),
  }),
});

const eventCards = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/content/cards/events" }),
  schema: cardSchema({
    deckName: 'events',
    extend: z.object({
      regions: z.array(z.string()).optional(),
    }),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/notes" }),
  schema: z.object({
    collection: z.string(),
    id: z.string(),
  }),
})

export const collections = {
  docs: defineCollection({ schema: docsSchema(), loader: docsLoader(), }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        'deck.laws.singular': z.string(),
        'deck.laws.plural': z.string(),
        'role.company.tea': z.string(),
        'role.company.tea2': z.string(),
        'role.govt.office': z.string(),
        'role.govt.tariffs': z.string(),
        'role.govt.tariffs.full': z.string(),
        'role.govt.governor': z.string(),
        'role.govt.governor.full': z.string(),
        'role.govt.military': z.string(),
        'role.govt.military.full': z.string(),
        'role.govt.customs': z.string(),
        'role.govt.customs.full': z.string(),
      }),
    }),
  }),
  decks,
  eventCards,
  lawCards,
  notes,
};
