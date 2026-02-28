import type { BaseCard } from "./content";
import type { ImageMetadata } from 'astro';

import { getEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { CardSizes } from "./card-sizing";

type Background = BaseCard["background"];
type DeckInfo = BaseCard["deck"];
type Dimensions = BaseCard["dimensions"];

interface DeckStyles {
  bleed: string;
  landscape: boolean;
  size: CardSizes;
}

export async function getDeckStyles(
  deck: DeckInfo, bg: Background, dim: Dimensions
): Promise<DeckStyles> {
  const deckEntry = deck?.reference && await getEntry(deck?.reference);
  const deckBg = deckEntry?.data.background;
  const deckDim = deckEntry?.data.dimensions;

  const bleed = deckBg?.bleed ?? bg?.bleed;
  const size = deckDim.size ?? dim?.size;
  const landscape = deckDim.landscape ?? dim?.landscape;

  return {
    bleed,
    landscape,
    size,
  }
}

async function getBackgroundUrl(image: ImageMetadata | undefined) {
  if (image === undefined)
    return undefined;

  const optimizedImg = await getImage({ src: image, format: 'png'});
  return optimizedImg.src;
}

interface CardStyles extends DeckStyles {
  backgrounds: string;
  rotate: string | undefined;
}

export async function getCardStyles(
  bg: Background, dim: Dimensions, deck: DeckInfo
): Promise<CardStyles> {
  const deckEntry = deck?.reference && await getEntry(deck?.reference);
  const deckBg = deckEntry?.data.background;
  const deckDim = deckEntry?.data.dimensions;

  // TODO: Determine whether to layer the background properties on top of each other or not.
  const bgColor = bg?.color ?? deckBg?.color;
  const bgImage = await getBackgroundUrl(bg?.image ?? deckBg?.image);
  const bgGradient = bg?.gradient ?? deckBg?.gradient;

  const backgrounds = [
    bgGradient,
    `no-repeat url(${bgImage})`,
    bgColor,
  ].filter(x => x).join(', ');

  const bleed = bg?.bleed ?? deckBg?.bleed;
  const size = dim?.size ?? deckDim.size;
  const landscape = dim?.landscape ?? deckDim.landscape;
  const rotate = (
    dim?.landscape && deckDim.landscape == false ? "90deg" :
    dim?.landscape === false && deckDim.landscape ? "90deg" : undefined
  );

  return {
    backgrounds,
    bleed,
    landscape,
    rotate,
    size,
  }
}
