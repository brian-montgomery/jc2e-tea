import { reference } from 'astro:content';
import { z } from 'astro/zod';


interface CardSchemaOpts<T extends z.AnyZodObject = z.SomeZodObject> {
	/**
	 * Extend Deckyard's card schema with additional fields.
	 *
	 * @example
	 * // Add two optional fields to the default schema.
	 * cardSchema({
	 * 	extend: z
	 * 		.object({
	 * 			'attack': z.number(),
	 * 			'defense': z.number(),
	 * 		})
	 * 		.partial(),
	 * })
	 */
  deckName?: string;
	extend?: T;
}

function defaultCardSchema(deckName?: string) {
  const deck = deckName
    ? reference('decks').default(deckName)
    : reference('decks').optional();

  const objData = {
    title: z.string(),
    quantity: z.number().default(1),
    deck,
  }

  return z.object({...objData});
}

export type DefaultCardSchema = ReturnType<typeof defaultCardSchema>;

/**
 * Based on the the return type of Zod’s `merge()` method. Merges the type of two `z.object()` schemas.
 * Also sets them as “passthrough” schemas as that’s how we use them. In practice whether or not the types
 * are passthrough or not doesn’t matter too much.
 *
 * @see https://github.com/colinhacks/zod/blob/3032e240a0c227692bb96eedf240ed493c53f54c/src/types.ts#L2656-L2660
 */
type MergeSchemas<A extends z.AnyZodObject, B extends z.AnyZodObject> = z.ZodObject<
  z.objectUtil.extendShape<A['shape'], B['shape']>,
  'passthrough',
  B['_def']['catchall']
>;
/** Type that extends Deckyard's default i18n schema with an optional, user-defined schema. */
type ExtendedSchema<T extends z.AnyZodObject> = T extends z.AnyZodObject
  ? MergeSchemas<DefaultCardSchema, T>
  : DefaultCardSchema;

/** Content collection schema for Starlight’s optional `i18n` collection. */
export function cardSchema<T extends z.AnyZodObject = z.SomeZodObject>({
  deckName = undefined,
  extend = z.object({}) as T,
}: CardSchemaOpts<T> = {}): ExtendedSchema<T> {
  return defaultCardSchema(deckName).merge(extend).passthrough() as ExtendedSchema<T>;
}
