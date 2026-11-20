import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO_BY_ROUTE } from "../data/seo.js";

// Use VITE_SITE_URL once a verified custom domain is connected.
const siteUrl = (import.meta.env.VITE_SITE_URL || "https://dharadi.netlify.app").replace(/\/$/, "");


function updateMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [name, content] = attribute.split(":");
    element.setAttribute(name, content);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

export default function SeoMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const page = SEO_BY_ROUTE[normalizedPath] || { ...SEO_BY_ROUTE["/"], indexable: false };
    const url = siteUrl + (normalizedPath === "/" ? "/" : normalizedPath);
    document.title = page.title;
    updateMeta('meta[name="description"]', "name:description", page.description);
    updateMeta('meta[name="robots"]', "name:robots", page.indexable ? "index, follow" : "noindex, nofollow");
    updateMeta('meta[property="og:title"]', "property:og:title", page.title);
    updateMeta('meta[property="og:description"]', "property:og:description", page.description);
    updateMeta('meta[property="og:url"]', "property:og:url", url);
    updateMeta('meta[name="twitter:title"]', "name:twitter:title", page.title);
    updateMeta('meta[name="twitter:description"]', "name:twitter:description", page.description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const script = document.getElementById("dharadi-page-schema");
    if (script) {
      const pageSchema = {
        "@context": "https://schema.org",
        "@type": page.schemaType,
        name: page.title,
        url,
        description: page.description,
        isPartOf: { "@type": "WebSite", name: "Dharadi", url: `${siteUrl}/` },
      };
      if (normalizedPath === "/shop") {
        pageSchema.breadcrumb = {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Shop", item: url },
          ],
        };
      }
      script.textContent = JSON.stringify(pageSchema);
    }
  }, [pathname]);

  return null;
}
