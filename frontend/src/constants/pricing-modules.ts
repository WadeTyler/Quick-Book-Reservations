
type PricingModule = {
  tier: string;
  tag: string;
  perks: string[];
  price?: number;
  href: string;
  linkText: string;
}

const pricingModules: PricingModule[] = [
  {
    tier: "Free",
    tag: "For brick and mortar businesses.",
    perks: [
      "1x Business",
      "5x Services per Business",
      "5x Staff per Business"
    ],
    href: `/signup`,
    linkText: "Get Started for Free"
  },
  {
    tier: "Standard",
    tag: "For quickly expanding businesses.",
    perks: [
      "3x Businesses",
      "10x Services per Business",
      "15x Staff per Business",
      "Stripe Payment Integration"
    ],
    price: 625,
    href: `/purchase?tier=entrepreneur`,
    linkText: "Upgrade your Businesses"
  },
  {
    tier: "Premium",
    tag: "For large scale businesses.",
    perks: [
      "12x Businesses",
      "30x Services per Business",
      "50x Staff per Business",
      "Stripe Payment Integration",
    ],
    price: 1999,
    href: `/purchase?tier=enterprise`,
    linkText: "Scale your Businesses"
  }
];

export default pricingModules;