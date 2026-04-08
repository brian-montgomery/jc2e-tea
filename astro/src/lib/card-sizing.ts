
export const CARD_SIZES = ["poker", "bridge", "mini", "mini-euro", "square"] as const;

export type CardSizes = typeof CARD_SIZES[number];
type CardSizeDimensions = readonly [string, string];

const cardDimensions: Record<CardSizes, CardSizeDimensions> = {
  poker: ["2.5in", "3.5in"],
  bridge: ["2.25in", "3.5in"],
  mini: ["1.75in", "2.5in"],
  "mini-euro": ["44mm", "67mm"],
  square: ["3in", "3in"],
} as const;

// Note: 1/8 in is 3.175 mm
const cardDimensionsInchesWithBleed: Record<CardSizes, CardSizeDimensions> = {
  poker: ["2.75in", "3.75in"],
  bridge: ["2.5in", "3.75in"],
  mini: ["1.75in", "2.5in"],
  "mini-euro": ["44mm", "67mm"],
  square: ["3.25in", "3.25in"],
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
