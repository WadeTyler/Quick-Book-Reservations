export type SubscriptionTier = {
  title: string;
  tag: string;
  priceInCents: number;
  perks: string[];
  href: string;
}

export const subscriptions: SubscriptionTier[] = [
  {
    title: "Free",
    tag: "For brick and mortar businesses.",
    priceInCents: 0,
    perks: [
      "1x Business",
      "5x Services per Business",
      "5x Staff per Business"
    ],
    href: "/signup"
  },
  {
    title: "Standard",
    tag: "For quickly expanding businesses.",
    priceInCents: 625,
    perks: [
      "3x Business",
      "10x Services per Business",
      "15x Staff per Business",
      "Stripe Payment Integration"
    ],
    href: "/subscribe?tier=standard"
  },
  {
    title: "Premium",
    tag: "For large scale businesses.",
    priceInCents: 1999,
    perks: [
      "12x Business",
      "30x Services per Business",
      "50x Staff per Business",
      "Stripe Payment Integration"
    ],
    href: "/subscribe?tier=premium"
  },
]