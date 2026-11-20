import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = "http://127.0.0.1:4173";
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"], {
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
server.stdout.on("data", (data) => { logs += data.toString(); });
server.stderr.on("data", (data) => { logs += data.toString(); });

async function ready() {
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) throw new Error(`Preview exited: ${logs}`);
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The local preview is starting.
    }
    await delay(250);
  }
  throw new Error(`Preview server did not start: ${logs}`);
}

let browser;
try {
  await ready();
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const widths = [320, 360, 375, 390, 414, 433, 540, 640, 768, 820, 1024, 1280, 1440, 1920];

  for (const route of ["/", "/shop", "/checkout"]) {
    const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
    page.setDefaultTimeout(5000);
    await page.route("**/*", (request) => {
      const target = request.request().url();
      if (/^https?:/.test(target) && !target.startsWith(origin)) return request.abort();
      return request.continue();
    });
    await page.goto(origin + route, { waitUntil: "domcontentloaded", timeout: 10000 });
    await page.locator("#root").waitFor({ state: "visible", timeout: 5000 });
    console.log(`Loaded ${route}`);

    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(120);
      const result = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        viewport: innerWidth,
      }));
      if (result.scroll > result.client + 2) {
        const offenders = await page.evaluate(() =>
          [...document.querySelectorAll("body *")]
            .map((node) => {
              const r = node.getBoundingClientRect();
              return {
                tag: node.tagName.toLowerCase(),
                classes: typeof node.className === "string" ? node.className.slice(0, 95) : "",
                text: node.textContent?.trim().slice(0, 32),
                left: Math.round(r.left),
                right: Math.round(r.right),
              };
            })
            .filter((r) => r.right > innerWidth + 2)
            .sort((a, b) => b.right - a.right)
            .slice(0, 8)
        );
        console.error("Overflow culprits:", JSON.stringify(offenders));
      }
      assert.ok(
        result.scroll <= result.client + 2,
        `${route} at ${width}px overflows: document ${result.scroll}px vs viewport ${result.client}px`
      );
      if (route === "/" && width === 375) {
        assert.equal(await page.locator("header").getByText("DHARADI", { exact: true }).isVisible(), true, "Brand name must show beside mobile logo");
        const headerSurface = await page.locator("header").evaluate((el) => getComputedStyle(el).backgroundColor);
        assert.ok(headerSurface.startsWith("rgb(") && headerSurface !== "rgba(0, 0, 0, 0)", "Mobile header background must be opaque before scroll");
        const heroTitle = page.locator("#home h1:visible");
        assert.equal(await heroTitle.isVisible(), true, "Hero headline missing at initial load");
        assert.equal(await heroTitle.evaluate(el => getComputedStyle(el.parentElement).opacity), "1", "Hero animation must not hide first-screen headline");
        assert.equal(await page.getByText("At Dharadi, we bring nature's finest products directly from trusted farms to your home", { exact: false }).count() > 0, true, "Mobile hero details must be rendered without a disclosure");
        await page.getByRole("button", { name: "Open menu" }).click();
        const menu = page.locator("#mobile-navigation");
        assert.equal(await menu.isVisible(), true);
        const menuBg = await menu.evaluate(el => getComputedStyle(el).backgroundColor);
        assert.ok(menuBg.startsWith("rgb("), "Mobile navigation must have its own non-transparent background");
        assert.equal(await menu.getByText("Our Story").isVisible(), true);
        await page.getByRole("button", { name: "Close menu" }).click();
        assert.equal(await page.locator("#mobile-navigation").count(), 0);
      }
      if (route === "/" && width === 1024) {
        assert.equal(await page.getByRole("button", { name: "Open menu" }).count(), 1);
      }
      console.log(`PASS ${route} at ${width}px`);
    }
    await page.close();
  }
  // Check the current mobile design without changing a single CSS class.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.route("**/*", (request) => {
    const url = request.request().url();
    if (/^https?:/.test(url) && !url.startsWith(origin)) return request.abort();
    return request.continue();
  });
  await mobile.goto(origin + "/", { waitUntil: "domcontentloaded" });
  const [productsY, aboutY] = await Promise.all([
    mobile.locator("#products").evaluate((el) => el.getBoundingClientRect().top),
    mobile.locator("#about").evaluate((el) => el.getBoundingClientRect().top),
  ]);
  assert.ok(productsY < aboutY, "Products must appear before About Dharadi");

  const productsRail = mobile.getByLabel("Featured products — swipe horizontally");
  const productMetrics = await productsRail.evaluate((el) => ({
    visible: el.clientWidth, total: el.scrollWidth,
  }));
  assert.ok(productMetrics.total > productMetrics.visible + 10, "Product browsing rail must still swipe");

  const gridColumns = (selector) => mobile.locator(selector).evaluate((el) =>
    getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length
  );
  assert.equal(await gridColumns(".dharadi-ref-why .trust-grid"), 2, "Trust section: preserve two mobile columns");
  assert.equal(await gridColumns(".dharadi-ref-process .grid"), 2, "Process: preserve two mobile columns");
  assert.equal(await gridColumns(".dharadi-ref-instagram .grid"), 3, "Gallery: preserve three mobile columns");
  assert.equal(await gridColumns(".dharadi-ref-contact .grid"), 3, "Contact: preserve three mobile cards");

  const gallery = mobile.locator(".dharadi-ref-instagram .grid");
  assert.equal(await gallery.locator("a").count(), 6, "Keep six Instagram photos");
  assert.equal(await gallery.evaluate((el) => getComputedStyle(el).display), "grid", "Mobile photo gallery must remain a grid");
  const reviews = mobile.locator(".dharadi-ref-testimonials article");
  assert.equal(await reviews.count(), 3, "Keep all three customer cards visible");
  for (const review of await reviews.all()) {
    const rect = await review.boundingBox();
    assert.ok(rect && Math.abs(rect.width - rect.height) < 5, "Reference testimonial cards must stay square");
  }
  assert.equal(await mobile.getByText("Delivery Across India", { exact: true }).count(), 0, "Old delivery section must remain removed");
  assert.ok(await mobile.getByText("Delivery across India", { exact: false }).count() > 0, "Nationwide delivery text missing");
  assert.ok(await mobile.getByText("Every product is carefully selected and processed.").count() > 0);
  assert.ok(await mobile.getByText("Harvested at peak freshness.").count() > 0);
  const founderStory = mobile.locator("#founder");
  assert.ok(await founderStory.locator("p").filter({ hasText: "Growing up in Nayindralli village" }).first().isVisible());
  await mobile.setViewportSize({ width: 1280, height: 800 });
  assert.equal(await gridColumns(".dharadi-ref-instagram .grid"), 6, "Desktop gallery must remain six columns");
  await mobile.close();
  console.log("Current mobile composition and original content verified.");

  // Verify every priced variant can be ordered via both cart and WhatsApp.
  const shopPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  shopPage.setDefaultTimeout(5000);
  await shopPage.route("**/*", (request) => {
    const target = request.request().url();
    if (/^https?:/.test(target) && !target.startsWith(origin)) return request.abort();
    return request.continue();
  });
  await shopPage.goto(origin + "/shop", { waitUntil: "domcontentloaded", timeout: 10000 });
  const moringa = shopPage.locator("article").filter({ hasText: "Moringa Powder" }).first();
  const select = moringa.getByRole("combobox", { name: "Pack size for Moringa Powder" });
  await select.selectOption("100g");
  assert.equal(await moringa.getByText("Sample price · confirm before purchase").count(), 0, "Old draft warning must not return");
  assert.equal(await moringa.getByText("₹119").count(), 1);
  assert.equal(await moringa.locator("del").getByText("₹149").count(), 1);
  assert.equal(await moringa.getByRole("button", { name: "Add to Cart" }).count(), 1, "All variants must be addable");
  const message = await moringa.getByRole("link", { name: "Order on WhatsApp" }).getAttribute("href");
  assert.ok(decodeURIComponent(message).includes("Moringa Powder (100g)"));
  await select.selectOption("500g");
  assert.equal(await moringa.getByText("₹399").count(), 1);
  assert.equal(await moringa.locator("del").getByText("₹499").count(), 1);
  await moringa.getByRole("button", { name: "Add to Cart" }).click();
  await shopPage.getByRole("heading", { name: "Your Cart" }).waitFor();
  assert.equal(await shopPage.getByText("Moringa Powder (500g)").count(), 1);
  const drawer = shopPage.locator("aside");
  await drawer.getByRole("button", { name: "Increase" }).click();
  assert.equal(await drawer.getByText("2", { exact: true }).count(), 1);
  assert.equal(await drawer.getByText("₹798").count(), 1);
  await drawer.getByRole("link", { name: "Checkout" }).click();
  await shopPage.getByText("Order Summary").waitFor();
  assert.equal(await shopPage.getByRole("button", { name: "Place Order — ₹798" }).count(), 1);
  assert.equal(await shopPage.locator("del").getByText("₹998").count(), 1);
  await shopPage.close();
  console.log("Variant selector, WhatsApp option, cart and checkout totals passed.");

  // Search must use the same discounted price fields as all other purchase paths.
  const searchPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await searchPage.route("**/*", (request) => {
    const url = request.request().url();
    if (/^https?:/.test(url) && !url.startsWith(origin)) return request.abort();
    return request.continue();
  });
  await searchPage.goto(origin + "/", { waitUntil: "domcontentloaded" });
  await searchPage.getByRole("button", { name: "Search", exact: true }).click();
  await searchPage.getByPlaceholder("Search products...").fill("Moringa Powder");
  const searchResult = searchPage.getByRole("button", { name: /Moringa Powder \(200g\)/ });
  assert.equal(await searchResult.getByText("₹199").count(), 1, "Search must display the discounted price");
  await searchResult.click();
  await searchPage.getByRole("heading", { name: "Your Cart" }).waitFor();
  assert.ok(await searchPage.locator("aside").getByText("₹199").count() > 0, "Search cart item must contain its selling price");
  await searchPage.close();
  console.log("Search pricing and add-to-cart passed.");

  console.log("All 42 route-and-viewport checks passed.");
} finally {
  await browser?.close();
  if (server.exitCode === null) server.kill("SIGTERM");
  server.stdout?.destroy();
  server.stderr?.destroy();
}
