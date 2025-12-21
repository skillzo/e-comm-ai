import { chromium } from "playwright";

const PRODUCT_URL =
  process.argv[2] ||
  "https://www.gymshark.com/products/gymshark-arrival-block-6-shorts-shorts-blue-aw25-1";

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  });

  // ❌ NOT networkidle
  await page.goto(PRODUCT_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // ✅ Wait for real PDP content
  await page.waitForSelector('[data-testid="pdp-title"]', {
    timeout: 60000,
  });

  const data = await page.evaluate(() => {
    const images = Array.from(
      document.querySelectorAll('[data-testid="pdp-gallery-image"] img')
    )
      .map((img) => img.src)
      .filter(Boolean);

    const name =
      document.querySelector('[data-testid="pdp-title"]')?.innerText || null;

    const price =
      document.querySelector('[data-testid="product-price"]')?.innerText ||
      null;

    const colors = Array.from(
      document.querySelectorAll('[data-testid="pdp-colour-swatch"]')
    ).map((el) => ({
      name: el.getAttribute("aria-label"),
    }));

    return {
      name,
      price,
      images: [...new Set(images)],
      availableColors: colors,
    };
  });

  console.log(JSON.stringify(data, null, 2));

  await browser.close();
})();
