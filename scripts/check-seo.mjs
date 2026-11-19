import { readFile } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";

for (const [route, keyword, shouldIndex] of [
  ["/", "Pure Food From Honest Farmers", true],
  ["/shop", "Our Natural Collection", true],
  ["/checkout", "Your cart is empty", false],
]) {
  const path = join("dist", route === "/" ? "" : route.slice(1), "index.html");
  const html = await readFile(path, "utf8");
  assert.ok(html.includes(keyword), `${route}: missing rendered content`);
  assert.ok(html.includes('rel="canonical"'), `${route}: missing canonical`);
  assert.ok(html.includes('id="dharadi-page-schema"'), `${route}: missing page schema`);
  assert.ok(
    html.includes(shouldIndex ? 'content="index, follow"' : 'content="noindex, nofollow"'),
    `${route}: incorrect robots tag`
  );
  assert.ok(html.includes('property="og:title"'), `${route}: missing Open Graph`);
  assert.ok(html.includes('name="twitter:title"'), `${route}: missing Twitter tags`);
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.ok(sitemap.includes("/shop") && !sitemap.includes("/checkout"), "Incorrect sitemap URLs");
console.log("SEO prerender validation passed for /, /shop and /checkout.");
