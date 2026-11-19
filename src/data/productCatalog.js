import { products } from "./products.js";

// Keep existing prices exactly as listed. Unpriced pack sizes are enquiries only.
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

// Prefer the existing 200 g price when the catalogue provides it.
export const catalogProducts = [...groups.values()].map((group) => {
  const options = /^\d+g$/i.test(group.originalSize)
    ? GRAM_SIZES
    : Object.keys(group.productsBySize);
  const preferredSize = options.includes("200g") && group.productsBySize["200g"]
    ? "200g"
    : group.originalSize;
  return {
    ...group,
    defaultSize: preferredSize,
    variants: options.map((size) => ({
      size,
      price: group.productsBySize[size]?.price ?? null,
    })),
  };
});

export function variantProduct(group, size) {
  const matching = group.productsBySize[size];
  if (!matching) return null;
  return { ...matching, packSize: size };
}
