
export const CARD_SIZES = ["poker", "bridge", "mini-euro"] as const;

export type CardSizes = typeof CARD_SIZES[number];
type CardSizeDimensions = readonly [string, string];

const cardDimensions: Record<CardSizes, CardSizeDimensions> = {
  poker: ["63.5mm", "88.9mm"],
  bridge: ["57.15mm", "88.9mm"],
  "mini-euro": ["44mm", "67mm"],
} as const;

interface CardDimensions {
  height: string;
  width: string;
}

export function getCardDimensions(size: CardSizes, landscape: boolean = false): CardDimensions {
  const sizing = cardDimensions[size];

  return {
    height: sizing[landscape ? 0 : 1],
    width: sizing[landscape ? 1 : 0],
  };
}
