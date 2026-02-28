import { reference, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { CARD_SIZES } from "src/lib/card-sizing";


/**
 * Based on the the return type of Zod’s `merge()` method. Merges the type of two `z.object()` schemas.
 * Also sets them as “passthrough” schemas as that’s how we use them. In practice whether or not the types
 * are passthrough or not doesn’t matter too much.
 *
 * @see https://github.com/colinhacks/zod/blob/3032e240a0c227692bb96eedf240ed493c53f54c/src/types.ts#L2656-L2660
 */
// Note: Research this for Zod 4.
type MergeSchemas<A extends z.AnyZodObject, B extends z.AnyZodObject> = z.ZodObject<
  z.objectUtil.extendShape<A['shape'], B['shape']>,
  'passthrough',
  B['_def']['catchall']
>;
type ExtendedSchema<A extends z.AnyZodObject, C extends z.AnyZodObject> =
  C extends z.AnyZodObject ? MergeSchemas<A, C>: A;
type SchemaConfigOrFunction<T extends z.AnyZodObject = z.SomeZodObject> =
  T | ((context: SchemaContext) => T);

const getSchema = (s: SchemaConfigOrFunction, context: SchemaContext) => typeof s === "function" ? s(context) : s


////////////
// TODO: Generate card and deck default types and support functions
////////////


////////
// Cards
////////
function defaultCardSchema(context: SchemaContext, deckName?: string) {

  const BaseZodCard = z.object({
    title: z.string().describe(
      "The title of the card. Note: this does need to be displayed when rendered."
    ).default(""),
    deck: reference('decks').describe(
      "The name of the collection representing the deck this card is in."
    ).optional(),
    quantity: z.number().default(1).describe(
      "The amount of copies of this card in its deck."
    ),
    background: z.object({
      bleed: z.string().describe(
        "The CSS width representing the bleed for the background"
      ).default("0"),
      image: context.image().describe(
        "The image that the card uses as a background."
      ),
      color: z.string().describe(
        "The CSS `background-color` that the card uses."
      ),
      gradient: z.string().describe(
        "The CSS `background-gradient` that the card uses."
      ),
    }).describe(
      "The background of the card that all of the content will be rendered on top of."
    ).partial().optional(),
  });

  if (deckName) {
    const schema = BaseZodCard.merge(z.object({
      deck: reference('decks').describe(
        BaseZodCard.shape.deck.description ?? ""
      ).default(deckName),
    }))
    return schema;
  }
  return BaseZodCard;
}

type BaseCardSchema = ReturnType<typeof defaultCardSchema>;
export type BaseCard = z.infer<BaseCardSchema>

type ExtendedCardSchema<T extends z.AnyZodObject> = ExtendedSchema<BaseCardSchema, T>
type CardSchemaFunction<T extends z.AnyZodObject = z.SomeZodObject> =
    (context: SchemaContext) => ExtendedCardSchema<T>;

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
   * 			'health': z.number(),
   * 		})
   * 		.partial(),
   * })
   */
  deckName?: string;
  extend?: SchemaConfigOrFunction<T>;
}

export function cardSchema<T extends z.AnyZodObject = z.SomeZodObject>({
  deckName = undefined,
  extend = z.object({}) as T,
}: CardSchemaOpts<T> = {}): CardSchemaFunction<T> {
  return (context: SchemaContext) =>
    defaultCardSchema(context, deckName)
    .merge(getSchema(extend, context))
    .passthrough() as ExtendedCardSchema<T>;
}


////////
// Decks
////////
function defaultDeckSchema({ image }: SchemaContext) {
  // TODO: Refactor this block to be used with the cards as well.
  const BaseZodDeck = z.object({
    name: z.string().describe(
      "The name of the deck. This is used for titles and other descriptions."
    ),
    size: z.enum(CARD_SIZES).describe(
      "The name of the card collection that represents the cards of the deck."
    ),
    landscape: z.boolean().default(false).describe(
      "The default orientation of the cards in this deck."
    ),
  });

  return BaseZodDeck.merge(z.object({
    background: z.object({
      bleed: z.string().describe(
        "The CSS width representing the bleed for the background."
      ).default("0"),
      image: image().describe(
        "The image that the card uses as a background."
      ),
      imageSize: z.string().describe(
        "The CSS `background-size` that the background image uses."
      ),
      color: z.string().describe(
        "The CSS `background-color` that the card uses."
      ),
      gradient: z.string().describe(
        "The CSS `background-gradient` that the card uses."
      ),
    }).describe(
      "The background of the card that all of the content will be rendered on top of."
    ).partial().optional(),
  }));
}

type BaseDeckSchema = ReturnType<typeof defaultDeckSchema>;
export type BaseDeck = z.infer<BaseDeckSchema>

type ExtendedDeckSchema<T extends z.AnyZodObject> = ExtendedSchema<BaseDeckSchema, T>
type DeckSchemaFunction<T extends z.AnyZodObject = z.SomeZodObject> =
    (context: SchemaContext) => ExtendedDeckSchema<T>;

interface DeckSchemaOpts<T extends z.AnyZodObject = z.SomeZodObject> {
  /**
   * Extend Deckyard's deck schema with additional fields.
   *
   * @example
   * // Add two optional fields to the default schema.
   * deckSchema({
   * 	extend: z
   * 		.object({
   * 			'shuffled': z.boolean(),
   * 		})
   * 		.partial(),
   * })
   */
  extend?: SchemaConfigOrFunction<T>;
}

export function deckSchema<T extends z.AnyZodObject = z.SomeZodObject>({
  extend = z.object({}) as T,
}: DeckSchemaOpts<T> = {}): DeckSchemaFunction<T> {
    return (context: SchemaContext) =>
      getSchema(defaultDeckSchema, context)
      .merge(getSchema(extend, context))
      .passthrough() as ExtendedDeckSchema<T>;
}
