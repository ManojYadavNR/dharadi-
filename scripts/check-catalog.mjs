import assert from "node:assert/strict";
import { catalogProducts, GRAM_SIZES, variantProduct } from "../src/data/productCatalog.js";

const moringa = catalogProducts.find((item) => item.name === "Moringa Powder");
assert.ok(moringa, "Moringa product must be present");
assert.deepEqual(moringa.variants.map((variant) => variant.size), GRAM_SIZES);
assert.equal(moringa.defaultSize, "200g");
assert.equal(moringa.variants.find((variant) => variant.size === "100g").price, 119);
assert.equal(moringa.variants.find((variant) => variant.size === "100g").estimated, true);
assert.equal(moringa.variants.find((variant) => variant.size === "200g").price, 199);
assert.equal(moringa.variants.find((variant) => variant.size === "200g").estimated, false);
assert.equal(moringa.variants.find((variant) => variant.size === "500g").price, 399);
assert.equal(variantProduct(moringa, "100g"), null, "Sample-priced options must not enter cart as confirmed orders");
assert.equal(variantProduct(moringa, "500g").id, "moringa-powder-500g");

for (const item of catalogProducts) {
  for (const variant of item.variants) {
    if (item.category === "oils") assert.equal(variant.size, "1L");
    if (variant.estimated) {
      assert.ok(variant.price > 0);
      assert.equal(variantProduct(item, variant.size), null);
    }
  }
}
const oil = catalogProducts.find((item) => item.name === "Cold Pressed Groundnut Oil");
assert.deepEqual(oil.variants.map((variant) => variant.size), ["1L"]);
assert.equal(catalogProducts.length, 5, "Existing catalogue products should remain");
assert.equal(new Set(catalogProducts.map((item) => item.id)).size, catalogProducts.length);
console.log("Catalog variant and sample price checks passed.");
