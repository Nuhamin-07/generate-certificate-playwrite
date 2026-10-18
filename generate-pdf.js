const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

async function generatePdf() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 850 },
    });

    const htmlPath = path.join(__dirname, "certificate.html");

    await page.goto(pathToFileURL(htmlPath).href, {
      waitUntil: "load",
    });

    await page.pdf({
      path: path.join(__dirname, "certificate.pdf"),
      format: "A4",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    console.log("Certificate PDF generated.");
  } finally {
    await browser.close();
  }
}

generatePdf().catch(console.error);
