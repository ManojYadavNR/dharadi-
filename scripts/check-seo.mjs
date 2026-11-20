import { readFile } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";
import { SEO_PAGES } from "../src/data/seo.js";

const site = (process.env.VITE_SITE_URL || "https://dharadi.netlify.app").replace(/\/+$/, "");
const escaped = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

for (const page of SEO_PAGES) {
  const { route, title, description, indexable, schemaType } = page;
  const file = join("dist", route === "/" ? "" : route.slice(1), "index.html");
  const html = await readFile(file, "utf8");
  const url = site + (route === "/" ? "/" : route);
  assert.ok(html.includes("<main"), `${route}: missing crawlable React content`);
  assert.ok(html.includes(`<title>${escaped(title)}</title>`), `${route}: incorrect title`);
  assert.ok(html.includes(`<meta name="description" content="${escaped(description)}" />`), `${route}: incorrect description`);
  assert.ok(html.includes(`<link rel="canonical" href="${escaped(url)}" />`), `${route}: incorrect canonical`);
  assert.ok(html.includes(`<meta name="robots" content="${indexable ? "index, follow" : "noindex, nofollow"}" />`), `${route}: incorrect indexability`);
  assert.ok(html.includes(`<meta property="og:url" content="${escaped(url)}" />`), `${route}: incorrect Open Graph URL`);
  assert.ok(html.includes('name="twitter:title"'), `${route}: missing Twitter tags`);

  const match = html.match(/<script id="dharadi-page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, `${route}: missing page JSON-LD`);
  const schema = JSON.parse(match[1]);
  assert.equal(schema["@type"], schemaType, `${route}: incorrect page schema`);
  assert.equal(schema.url, url, `${route}: schema canonical mismatch`);
  assert.equal(schema.name, title, `${route}: schema title mismatch`);
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const page of SEO_PAGES) {
  const url = site + (page.route === "/" ? "/" : page.route);
  assert.equal(sitemap.includes(`<loc>${escaped(url)}</loc>`), page.indexable, `${page.route}: incorrect sitemap presence`);
}
const robots = await readFile("dist/robots.txt", "utf8");
assert.ok(robots.includes(`Sitemap: ${site}/sitemap.xml`), "Missing robots sitemap reference");
assert.ok(!robots.includes("Disallow: /checkout"), "Do not block noindex checkout from crawlers");
console.log(`SEO validation passed: ${SEO_PAGES.length} prerendered routes, canonical/robots/schema/meta, sitemap.`);
