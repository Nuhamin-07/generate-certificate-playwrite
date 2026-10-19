// const { chromium } = require("playwright");
// const path = require("path");
// const { pathToFileURL } = require("url");

// async function generatePdf() {
//   const browser = await chromium.launch({ headless: true });

//   try {
//     const page = await browser.newPage({
//       viewport: { width: 1200, height: 850 },
//     });

//     const htmlPath = path.join(__dirname, "certificate.html");

//     await page.goto(pathToFileURL(htmlPath).href, {
//       waitUntil: "load",
//     });

//     await page.pdf({
//       path: path.join(__dirname, "certificate.pdf"),
//       format: "A4",
//       landscape: true,
//       printBackground: true,
//       preferCSSPageSize: true,
//       margin: {
//         top: "0",
//         right: "0",
//         bottom: "0",
//         left: "0",
//       },
//     });

//     console.log("Certificate PDF generated.");
//   } finally {
//     await browser.close();
//   }
// }

// generatePdf().catch(console.error);

const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  res.send("Certificate PDF API is running.");
});

app.post("/generate-pdf", async (req, res) => {
  let browser;

  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({
        success: false,
        message: "HTML certificate content is required.",
      });
    }

    browser = await chromium.launch({ headless: true });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="certificate.pdf"',
    );

    return res.send(pdf);
  } catch (error) {
    console.error("PDF generation failed:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate certificate PDF.",
      });
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Certificate PDF API listening on port ${PORT}`);
});
