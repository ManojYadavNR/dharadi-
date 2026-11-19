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
  const widths = [320, 360, 375, 390, 414, 540, 640, 768, 820, 1024, 1280, 1440, 1920];

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
        await page.getByRole("button", { name: "Open menu" }).click();
        assert.equal(await page.locator("#mobile-navigation").isVisible(), true);
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
  // Compact homepage: product cards and trust/process/review sections must swipe sideways on phones.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.route("**/*", (request) => {
    const url = request.request().url();
    if (/^https?:/.test(url) && !url.startsWith(origin)) return request.abort();
    return request.continue();
  });
  await mobile.goto(origin + "/", { waitUntil: "domcontentloaded" });
  const productsSection = mobile.locator("#products");
  const aboutSection = mobile.locator("#about");
  const [productsY, aboutY] = await Promise.all([
    productsSection.evaluate(el => el.getBoundingClientRect().top),
    aboutSection.evaluate(el => el.getBoundingClientRect().top),
  ]);
  assert.ok(productsY < aboutY, "Products must appear above About Dharadi");
  for (const label of [
    "Featured products — swipe horizontally",
    "Why families trust Dharadi — swipe horizontally",
    "Our process steps — swipe horizontally",
    "Customer reviews — swipe horizontally",
  ]) {
    const rail = mobile.getByLabel(label);
    const metrics = await rail.evaluate(el => ({ visible: el.clientWidth, total: el.scrollWidth }));
    assert.ok(metrics.total > metrics.visible + 10, `Expected swipe rail for ${label}`);
  }
  assert.equal(await mobile.locator("#products article").count(), 5);
  assert.ok(await mobile.getByText("Every product is carefully selected and processed.").count() > 0, "Trust section copy should remain intact");
  assert.ok(await mobile.getByText("Harvested at peak freshness.").count() > 0, "Process text should remain intact");
  await mobile.close();
  console.log("Compact homepage mobile layout and preserved content checks passed.");

  // Product variants are user-facing controls; verify price/quantity/cart coherence.
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
  assert.equal(await moringa.getByText("Sample price · confirm before purchase").count(), 1);
  assert.equal(await moringa.getByText("₹119").count(), 1);
  assert.equal(await moringa.getByRole("button", { name: "Add to Cart" }).count(), 0);
  const message = await moringa.getByRole("link", { name: "Confirm on WhatsApp" }).getAttribute("href");
  assert.ok(decodeURIComponent(message).includes("Moringa Powder (100g)"));
  await select.selectOption("500g");
  await moringa.getByRole("button", { name: "Increase units of Moringa Powder" }).click();
  assert.equal(await moringa.getByText("Total ₹798").count(), 1);
  await moringa.getByRole("button", { name: "Add to Cart" }).click();
  await shopPage.getByRole("heading", { name: "Your Cart" }).waitFor();
  assert.equal(await shopPage.getByText("Moringa Powder (500g)").count(), 1);
  assert.equal(await shopPage.locator("aside").getByText("₹798").count(), 1);
  await shopPage.close();
  console.log("Product size, sample price, WhatsApp enquiry and cart quantity tests passed.");

  console.log("All 39 route-and-viewport checks passed.");
} finally {
  await browser?.close();
  if (server.exitCode === null) server.kill("SIGTERM");
  server.stdout?.destroy();
  server.stderr?.destroy();
}
