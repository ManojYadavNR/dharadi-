import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = "http://127.0.0.1:4173";
const server = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173", "--strictPort"], {
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
  console.log("All 39 route-and-viewport checks passed.");
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
