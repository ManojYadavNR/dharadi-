import assert from "node:assert/strict";
import { catalogProducts, GRAM_SIZES, variantProduct } from "../src/data/productCatalog.js";

const moringa = catalogProducts.find((item) => item.name === "Moringa Powder");
assert.ok(moringa, "Moringa product must be present");
assert.deepEqual(moringa.variants.map((variant) => variant.size), GRAM_SIZES);
assert.equal(moringa.defaultSize, "200g");
assert.equal(moringa.variants.find((variant) => variant.size === "100g").price, null);
assert.equal(moringa.variants.find((variant) => variant.size === "200g").price, 199);
assert.equal(moringa.variants.find((variant) => variant.size === "500g").price, 399);
assert.equal(variantProduct(moringa, "100g"), null, "Unpriced options must not enter cart");
assert.equal(variantProduct(moringa, "500g").id, "moringa-powder-500g");
const oil = catalogProducts.find((item) => item.name === "Cold Pressed Groundnut Oil");
assert.deepEqual(oil.variants.map((variant) => variant.size), ["1L"], "Do not invent gram variants for liquids");
assert.equal(catalogProducts.length, 5, "Duplicate Moringa listings should be grouped");
assert.equal(new Set(catalogProducts.map((item) => item.id)).size, catalogProducts.length);
console.log("Catalog variant checks passed.");
