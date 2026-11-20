import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { products, variantPrices } from "../src/data/products.js";
import { catalogProducts, variantProduct } from "../src/data/productCatalog.js";
import { SEO_PAGES } from "../src/data/seo.js";

// Price configuration, dropdown options and cart totals must stay in sync.
assert.ok(products.length > 0, "Product list must not be empty");
assert.equal(new Set(products.map((p) => p.id)).size, products.length, "Duplicate product IDs");
assert.equal(new Set(SEO_PAGES.map((p) => p.route)).size, SEO_PAGES.length, "Duplicate SEO routes");

for (const [group, sizes] of Object.entries(variantPrices)) {
  for (const [size, price] of Object.entries(sizes)) {
    assert.ok(Number.isFinite(price.actualPrice) && price.actualPrice > 0, `Invalid original price: ${group} ${size}`);
    assert.ok(Number.isFinite(price.discountedPrice) && price.discountedPrice > 0, `Invalid selling price: ${group} ${size}`);
    assert.ok(price.discountedPrice <= price.actualPrice, `Selling price exceeds original price: ${group} ${size}`);
  }
}

for (const product of products) {
  assert.ok(product.name && product.packSize && product.image, `Missing product fields: ${product.id}`);
  assert.ok(Number.isFinite(product.discountedPrice) && product.discountedPrice > 0, `Missing variant price: ${product.id}`);
  assert.ok(Number.isFinite(product.actualPrice) && product.actualPrice >= product.discountedPrice, `Invalid original price: ${product.id}`);
  if (product.image.startsWith("/")) await access(`public${product.image}`);
}

for (const group of catalogProducts) {
  assert.ok(group.variants.length > 0, `Missing sizes for ${group.name}`);
  assert.ok(group.variants.some((v) => v.size === group.defaultSize), `Missing default pack size: ${group.name}`);
  for (const variant of group.variants) {
    assert.ok(Number.isFinite(variant.discountedPrice), `Unpriced option: ${group.name} ${variant.size}`);
    const selected = variantProduct(group, variant.size);
    assert.ok(selected, `Cannot add ${group.name} ${variant.size} to cart`);
    assert.equal(selected.price, variant.discountedPrice, `Cart total mismatch: ${group.name} ${variant.size}`);
    assert.equal(selected.packSize, variant.size, `Wrong pack size in cart: ${group.name} ${variant.size}`);
  }
}

for (const route of ["/", "/shop", "/checkout"]) {
  assert.ok(SEO_PAGES.some((p) => p.route === route), `SEO metadata missing for ${route}`);
}
assert.ok(!SEO_PAGES.find((p) => p.route === "/checkout").indexable, "Checkout must not be indexed");
console.log(`Catalog / SEO checks passed: ${products.length} variants, ${catalogProducts.length} products, ${SEO_PAGES.length} routes.`);
