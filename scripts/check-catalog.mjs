import assert from "node:assert/strict";
import { products } from "../src/data/products.js";
import { catalogProducts, GRAM_SIZES, variantProduct } from "../src/data/productCatalog.js";

// Every individual pack must be configurable in src/data/products.js.
assert.equal(products.length, 13);
assert.equal(new Set(products.map((p) => p.id)).size, products.length);
for (const p of products) {
  assert.ok(Number.isFinite(p.actualPrice) && p.actualPrice > 0, `Invalid actual price: ${p.id}`);
  assert.ok(Number.isFinite(p.discountedPrice) && p.discountedPrice > 0, `Invalid discounted price: ${p.id}`);
  assert.ok(p.actualPrice > p.discountedPrice, `Discount must be below actual price: ${p.id}`);
}
assert.equal(catalogProducts.length, 5, "Existing product families must remain grouped");

const moringa = catalogProducts.find((item) => item.name === "Moringa Powder");
assert.ok(moringa);
assert.deepEqual(moringa.variants.map((variant) => variant.size), GRAM_SIZES);
assert.equal(moringa.defaultSize, "200g");
const g = (size) => moringa.variants.find((v) => v.size === size);
assert.deepEqual(
  [g("100g").actualPrice, g("100g").discountedPrice, g("100g").estimated],
  [149, 119, true]
);
assert.deepEqual(
  [g("200g").actualPrice, g("200g").discountedPrice, g("200g").estimated],
  [249, 199, false]
);
assert.deepEqual(
  [g("500g").actualPrice, g("500g").discountedPrice, g("500g").estimated],
  [499, 399, false]
);
assert.equal(variantProduct(moringa, "100g"), null, "Draft price cannot be checked out");
const selected = variantProduct(moringa, "500g");
assert.equal(selected.id, "moringa-powder-500g");
assert.equal(selected.price, selected.discountedPrice, "Cart must charge discounted selling price");
assert.equal(selected.price * 2, 798, "Checkout quantity calculation must use discounted price");
assert.equal(selected.actualPrice * 2, 998, "Struck-through original total must not be charged");

for (const group of catalogProducts) {
  const sizes = group.variants.map((v) => v.size);
  assert.deepEqual(sizes, group.category === "oils" ? ["1L"] : GRAM_SIZES);
  for (const v of group.variants) {
    const sku = group.productsBySize[v.size];
    assert.ok(sku, `Missing SKU configuration: ${group.name} ${v.size}`);
    assert.equal(v.discountedPrice, sku.discountedPrice);
    assert.equal(v.actualPrice, sku.actualPrice);
    const addable = variantProduct(group, v.size);
    if (sku.isPriceDraft) assert.equal(addable, null);
    else assert.equal(addable.price, v.discountedPrice);
  }
}
console.log("Individual crossed-out prices, discounted cart totals and draft price restrictions passed.");
