import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({
    type: 'data',
    schema: i18nSchema({
      extend: z.object({
        'role.company.tea': z.string(),
        'role.company.tea2': z.string(),
        'role.govt.office': z.string(),
        'role.govt.tariffs': z.string(),
        'role.govt.governor': z.string(),
        'role.govt.military': z.string(),
        'role.govt.military.full': z.string(),
        'role.govt.customs': z.string(),
      }),
    }),
  }),
};
