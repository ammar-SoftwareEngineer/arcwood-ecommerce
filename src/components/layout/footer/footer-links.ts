/** Static footer URLs; labels from `footer.quickLinks.*` in messages. */
export const footerQuickLinks = [
  { href: "/terms-conditions", messageKey: "terms" },
  { href: "/privacy-policy", messageKey: "privacy" },
  { href: "/shipping-delivery", messageKey: "shipping" },
  { href: "/refund-return-policy", messageKey: "returns" },
] as const;

export const footerSocialOrder = ["facebook", "instagram", "linkedin"] as const;
