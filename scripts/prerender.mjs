import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { renderRoute } from "../.prerender-server/entry-server.js";

const root = resolve("dist");
const template = await readFile(join(root, "index.html"), "utf8");
const site = (process.env.VITE_SITE_URL || "https://dharadi.netlify.app").replace(/\/+$/, "");
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);

const pages = [
  {
    route: "/",
    title: "Dharadi | Natural Food from Karnataka",
    description:
      "Discover Dharadi, a natural food brand from Karnataka. Explore our collection, learn our story, and contact us to order. From Soil to Soul.",
    indexable: true,
    schemaType: "WebPage",
  },
  {
    route: "/shop",
    title: "Shop Natural Food Products | Dharadi",
    description:
      "Explore the Dharadi natural food collection. Browse products and contact our team for availability and delivery.",
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

const replace = (html, pattern, next, label) => {
  if (!pattern.test(html)) throw new Error(`Cannot update ${label} in built HTML`);
  return html.replace(pattern, next);
};

for (const page of pages) {
  const canonical = site + (page.route === "/" ? "/" : page.route);
  const safeTitle = escapeHtml(page.title);
  const safeDescription = escapeHtml(page.description);
  const safeCanonical = escapeHtml(canonical);
  const robots = page.indexable ? "index, follow" : "noindex, nofollow";
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": page.schemaType,
    name: page.title,
    url: canonical,
    description: page.description,
    isPartOf: { "@type": "WebSite", name: "Dharadi", url: site + "/" },
  };
  if (page.route === "/shop") {
    pageSchema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site + "/" },
        { "@type": "ListItem", position: 2, name: "Shop", item: canonical },
      ],
    };
  }

  let html = template;
  html = replace(html, /<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`, "title");
  html = replace(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
    `<meta name="description" content="${safeDescription}" />`,
    "description"
  );
  html = replace(
    html,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?\s*>/,
    `<meta name="robots" content="${robots}" />`,
    "robots"
  );
  html = replace(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/,
    `<link rel="canonical" href="${safeCanonical}" />`,
    "canonical"
  );
  for (const [property, value] of [
    ["og:title", safeTitle],
    ["og:description", safeDescription],
    ["og:url", safeCanonical],
  ]) {
    html = replace(
      html,
      new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*\\/?\\s*>`),
      `<meta property="${property}" content="${value}" />`,
      property
    );
  }
  for (const [name, value] of [
    ["twitter:title", safeTitle],
    ["twitter:description", safeDescription],
  ]) {
    html = replace(
      html,
      new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*\\/?\\s*>`),
      `<meta name="${name}" content="${value}" />`,
      name
    );
  }
  // JSON-LD data is built from fixed local strings, not from visitor input.
  html = replace(
    html,
    /<\/head>/,
    `  <script id="dharadi-page-schema" type="application/ld+json">${JSON.stringify(pageSchema)}</script>\n  </head>`,
    "head"
  );
  const markup = renderRoute(page.route);
  html = replace(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${markup}</div>`,
    "React root"
  );

  const folder = page.route === "/" ? root : join(root, page.route.slice(1));
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, "index.html"), html, "utf8");

  if (page.indexable && (!html.includes("Dharadi") || !html.includes("<main"))) {
    throw new Error(`Prerendered ${page.route} content is missing`);
  }
  console.log(`Prerendered ${page.route} — ${html.length} bytes`);
}

const indexedUrls = pages.filter((p) => p.indexable).map((p) => (
  `  <url><loc>${escapeHtml(site + (p.route === "/" ? "/" : p.route))}</loc></url>`
));
await writeFile(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexedUrls.join("\n")}\n</urlset>\n`,
  "utf8"
);
await writeFile(
  join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /checkout\n\nSitemap: ${site}/sitemap.xml\n`,
  "utf8"
);
await rm(resolve(".prerender-server"), { recursive: true, force: true });
