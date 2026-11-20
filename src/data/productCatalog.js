import { products } from "./products.js";

// All pack-specific prices now live together in products.js.
// actualPrice = crossed-out reference price; discountedPrice = amount customers pay.
// isPriceDraft = true marks indicative pricing. Both cart and WhatsApp stay available;
// the draft-price notice remains visible until prices are approved.
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

  return {
    ...group,
    defaultSize: preferredSize,
    variants: options.map((size) => {
      const sku = group.productsBySize[size];
      return {
        size,
        actualPrice: sku?.actualPrice ?? null,
        discountedPrice: sku?.discountedPrice ?? null,
        estimated: Boolean(sku?.isPriceDraft),
      };
    }),
  };
});

export function variantProduct(group, size) {
  const match = group.productsBySize[size];
  if (!match || !Number.isFinite(match.discountedPrice)) return null;
  // The cart and checkout already sum item.price. Always assign discountedPrice here.
  return { ...match, price: match.discountedPrice, packSize: size };
}
