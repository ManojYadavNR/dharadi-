import { products } from "./products.js";

// Provisional display prices only: confirm actual selling prices before launch.
// Existing catalog prices below always take precedence over these examples.
export const SAMPLE_PACK_PRICES = {
  "fresh-oyster-mushrooms-200g": { "100g": 29, "500g": 119 },
  "dried-mushrooms-100g": { "200g": 699, "500g": 1649 },
  "mushroom-powder-100g": { "200g": 649, "500g": 1499 },
  "moringa-powder-200g": { "100g": 119 },
};
export const GRAM_SIZES = ["100g", "200g", "500g"];

function baseName(name) {
  return name.replace(/\s*\([^)]*\)$/, "");
}

const groups = new Map();
for (const product of products) {
  const name = baseName(product.name);
  const groupId = `${product.category}:${name.toLowerCase()}`;
  if (!groups.has(groupId)) {
    groups.set(groupId, {
      ...product,
      id: groupId,
      name,
      productsBySize: {},
      originalSize: product.packSize,
    });
  }
  groups.get(groupId).productsBySize[product.packSize] = product;
}

export const catalogProducts = [...groups.values()].map((group) => {
  const options = /^\d+g$/i.test(group.originalSize)
    ? GRAM_SIZES
    : Object.keys(group.productsBySize);
  const preferredSize = options.includes("200g") && group.productsBySize["200g"]
    ? "200g"
    : group.originalSize;
  const draftPrices = SAMPLE_PACK_PRICES[Object.values(group.productsBySize)[0].id] || {};
  return {
    ...group,
    defaultSize: preferredSize,
    variants: options.map((size) => {
      const realPrice = group.productsBySize[size]?.price;
      return {
        size,
        price: realPrice ?? draftPrices[size] ?? null,
        estimated: realPrice === undefined && draftPrices[size] !== undefined,
      };
    }),
  };
});

export function variantProduct(group, size) {
  const match = group.productsBySize[size];
  if (!match) return null; // sample prices cannot be checked out as confirmed prices
  return { ...match, packSize: size };
}
