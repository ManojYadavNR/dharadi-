// Shared, crawlable metadata for the existing public routes.
// Keep this file free of browser APIs: Node uses it when prerendering,
// and the React router uses the same values after client-side navigation.
export const SEO_PAGES = [
  {
    route: "/",
    title: "Dharadi | Natural Foods from Honest Farmers in Karnataka",
    description:
      "Explore Dharadi natural foods from Karnataka: moringa powder, oyster mushrooms, cold-pressed groundnut oil and our farm-to-family story.",
    indexable: true,
    schemaType: "WebPage",
  },
  {
    route: "/shop",
    title: "Shop Moringa Powder, Mushrooms & Natural Foods | Dharadi",
    description:
      "Shop Dharadi's range of moringa powder, fresh and dried oyster mushrooms, mushroom powder and cold-pressed groundnut oil. Choose your pack size.",
    indexable: true,
    schemaType: "CollectionPage",
  },
  {
    route: "/checkout",
    title: "Checkout | Dharadi",
    description: "Review your Dharadi cart and delivery details.",
    indexable: false,
    schemaType: "WebPage",
  },
];

export const SEO_BY_ROUTE = Object.fromEntries(
  SEO_PAGES.map((page) => [page.route, page])
);
