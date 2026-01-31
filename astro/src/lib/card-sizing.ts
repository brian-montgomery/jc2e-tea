
export const CARD_SIZES = ["poker", "bridge", "mini-euro"] as const;

type CardSizes = typeof CARD_SIZES[number];
type Dimensions = readonly [string, string];

export const cardDimensions: Record<CardSizes, Dimensions> = {
  poker: ["63.5mm", "88.9mm"],
  bridge: ["57.15mm", "88.9mm"],
  "mini-euro": ["44mm", "67mm"],
} as const;
