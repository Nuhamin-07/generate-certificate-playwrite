(async function () {
  const certificateId = "hjhdjh7878eE";

  function loadScript(src, isAvailable) {
    if (isAvailable()) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector(
        `script[data-certificate-src="${src}"]`,
      );

      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error("Failed to load " + src)),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.certificateSrc = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Could not load " + src));

      document.head.appendChild(script);
    });
  }

  // Draw gold ribbon seal with high-resolution Canvas 2D
  function drawSeal(canvas) {
    const scale = 4;
    canvas.width = 100 * scale;
    canvas.height = 130 * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    // Left ribbon tail (#d98618)
    ctx.fillStyle = "#d98618";
    ctx.beginPath();
    ctx.moveTo(27, 70);
    ctx.lineTo(50, 70);
    ctx.lineTo(50, 124);
    ctx.lineTo(38.5, 112);
    ctx.lineTo(27, 124);
    ctx.closePath();
    ctx.fill();

    // Right ribbon tail (#f2a93b)
    ctx.fillStyle = "#f2a93b";
    ctx.beginPath();
    ctx.moveTo(50, 70);
    ctx.lineTo(73, 70);
    ctx.lineTo(73, 124);
    ctx.lineTo(61.5, 112);
    ctx.lineTo(50, 124);
    ctx.closePath();
    ctx.fill();

    // Gold circle with smooth gradient matching original SVG (#sg)
    const grad = ctx.createLinearGradient(10, 4, 90, 84);
    grad.addColorStop(0, "#ffd27a");
    grad.addColorStop(0.55, "#f2a93b");
    grad.addColorStop(1, "#d98618");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(50, 44, 40, 0, Math.PI * 2);
    ctx.fill();

    // Outer white decorative ring (r=33, stroke-width=1.6)
    ctx.strokeStyle = "#fffaf0";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(50, 44, 33, 0, Math.PI * 2);
    ctx.stroke();

    // Inner subtle ring (r=29.5, stroke-width=0.6, opacity=0.55)
    ctx.strokeStyle = "rgba(255, 250, 240, 0.55)";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(50, 44, 29.5, 0, Math.PI * 2);
    ctx.stroke();

    // White checkmark (stroke-width=6.5, lineCap=round, lineJoin=round)
    ctx.strokeStyle = "#fffaf0";
    ctx.lineWidth = 6.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(34, 45);
    ctx.lineTo(45, 56);
    ctx.lineTo(67, 31);
    ctx.stroke();
  }

  // Draw bottom wavy footer with multi-stop gradients
  function drawWave(canvas) {
    canvas.width = 1123 * 2;
    canvas.height = 242 * 2;
    const ctx = canvas.getContext("2d");
    const sx = canvas.width / 297;
    const sy = canvas.height / 64;
    ctx.scale(sx, sy);

    // Layer 1 (#5eead4, opacity 0.35)
    ctx.fillStyle = "rgba(94, 234, 212, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(60, -4, 120, 20, 190, 8);
    ctx.bezierCurveTo(225, 2, 270, -2, 297, 6);
    ctx.lineTo(297, 64);
    ctx.lineTo(0, 64);
    ctx.closePath();
    ctx.fill();

    // Layer 2 (#14b8a6, opacity 0.55)
    ctx.fillStyle = "rgba(20, 184, 166, 0.55)";
    ctx.beginPath();
    ctx.moveTo(0, 16);
    ctx.bezierCurveTo(70, 4, 130, 28, 200, 16);
    ctx.bezierCurveTo(237.5, 10, 275, 8, 297, 14);
    ctx.lineTo(297, 64);
    ctx.lineTo(0, 64);
    ctx.closePath();
    ctx.fill();

    // Layer 3 (Deep teal linear gradient matching #w3)
    const grad = ctx.createLinearGradient(0, 0, 297, 0);
    grad.addColorStop(0, "#0a3d47");
    grad.addColorStop(0.6, "#0d5a60");
    grad.addColorStop(1, "#0f766e");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 24);
    ctx.bezierCurveTo(80, 12, 140, 34, 210, 22);
    ctx.bezierCurveTo(245, 16, 280, 16, 297, 22);
    ctx.lineTo(297, 64);
    ctx.lineTo(0, 64);
    ctx.closePath();
    ctx.fill();
  }

  // Draw corner decorative rings
  function drawCornerArt(canvas) {
    const scale = 4;
    canvas.width = 120 * scale;
    canvas.height = 78 * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    ctx.strokeStyle = "rgba(15, 118, 110, 0.11)";
    ctx.lineWidth = 0.35;
    const radii = [22, 36, 50, 64, 78];
    for (const r of radii) {
      ctx.beginPath();
      ctx.arc(122, -4, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(242, 169, 59, 0.9)";
    ctx.beginPath();
    ctx.arc(96, 46, 1.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(15, 118, 110, 0.5)";
    ctx.beginPath();
    ctx.arc(62, 12, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Initialize Canvas graphics for Seal, Wave, and Corner-art
  // Supports both existing <canvas> elements and automatic upgrade from <svg>
  function initGraphics(page) {
    // 1. Seal
    const sealEl = page.querySelector(".seal");
    if (sealEl && !sealEl.dataset.canvasRendered) {
      let canvas;
      if (sealEl.tagName.toLowerCase() === "canvas") {
        canvas = sealEl;
      } else {
        canvas = document.createElement("canvas");
        canvas.className =
          typeof sealEl.className === "string"
            ? sealEl.className
            : (sealEl.className && sealEl.className.baseVal ? sealEl.className.baseVal : "seal");
        sealEl.parentNode.replaceChild(canvas, sealEl);
      }
      canvas.dataset.canvasRendered = "true";
      drawSeal(canvas);
    }

    // 2. Wave
    const waveEl = page.querySelector(".wave");
    if (waveEl && !waveEl.dataset.canvasRendered) {
      let canvas;
      if (waveEl.tagName.toLowerCase() === "canvas") {
        canvas = waveEl;
      } else {
        canvas = document.createElement("canvas");
        canvas.className =
          typeof waveEl.className === "string"
            ? waveEl.className
            : (waveEl.className && waveEl.className.baseVal ? waveEl.className.baseVal : "wave");
        waveEl.parentNode.replaceChild(canvas, waveEl);
      }
      canvas.dataset.canvasRendered = "true";
      drawWave(canvas);
    }

    // 3. Corner Art
    const cornerEl = page.querySelector(".corner-art");
    if (cornerEl && !cornerEl.dataset.canvasRendered) {
      let canvas;
      if (cornerEl.tagName.toLowerCase() === "canvas") {
        canvas = cornerEl;
      } else {
        canvas = document.createElement("canvas");
        canvas.className =
          typeof cornerEl.className === "string"
            ? cornerEl.className
            : (cornerEl.className && cornerEl.className.baseVal ? cornerEl.className.baseVal : "corner-art");
        cornerEl.parentNode.replaceChild(canvas, cornerEl);
      }
      canvas.dataset.canvasRendered = "true";
      drawCornerArt(canvas);
    }
  }

  function initializeCertificate() {
    const certificate = document.getElementById("certificate");
    const button = document.getElementById("download-certificate");
    const qrContainer = document.getElementById("certificate-qr");
    const page = certificate?.querySelector(".page");

    if (!certificate || !button || !page) {
      console.error("Certificate element or download button not found.");
      throw new Error("Certificate element or download button not found.");
    }

    if (typeof QRCode === "undefined") {
      console.error("QRCode library is unavailable.");
      throw new Error("QRCode library is unavailable.");
    }

    if (typeof html2pdf === "undefined") {
      console.error("html2pdf library is unavailable.");
      throw new Error("html2pdf library is unavailable.");
    }

    // 1. Render Graphics (Seal, Wave, Corner-Art) once on load
    initGraphics(page);

    // 2. Render QR Code
    if (qrContainer && !qrContainer.dataset.initialized) {
      const verifyUrl = new URL("/verify/", window.location.origin);
      verifyUrl.searchParams.set("id", certificateId);

      qrContainer.innerHTML = "";

      new QRCode(qrContainer, {
        text: verifyUrl.href,
        width: 600,
        height: 600,
        correctLevel: QRCode.CorrectLevel.M,
      });

      qrContainer.dataset.initialized = "true";
    }

    if (button.dataset.initialized === "true") return;
    button.dataset.initialized = "true";

    // 3. Handle PDF Download without any DOM hiding or flickering
    button.addEventListener("click", async function () {
      button.disabled = true;
      const originalText = button.textContent;
      button.textContent = "Generating PDF...";

      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }

        // Gather existing document CSS rules to inject into cloned document
        let collectedCss = "";
        try {
          for (const sheet of document.styleSheets) {
            try {
              if (sheet.cssRules) {
                for (const rule of sheet.cssRules) {
                  collectedCss += rule.cssText + "\n";
                }
              }
            } catch (e) {
              // Ignore cross-origin stylesheet security errors
            }
          }
        } catch (e) {}

        // Fallback critical styles for Certificate
        const criticalCertificateCss = `
          .page {
            position: relative !important;
            width: 297mm !important;
            height: 210mm !important;
            overflow: hidden !important;
            background: #fcfcfb !important;
            box-sizing: border-box !important;
          }
          .corner-art {
            position: absolute !important;
            right: 0 !important;
            top: 0 !important;
            width: 120mm !important;
            height: 78mm !important;
            z-index: 1 !important;
            display: block !important;
          }
          .header {
            position: absolute !important;
            left: 20mm !important;
            right: 20mm !important;
            top: 13mm !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
          }
          .logo {
            display: flex !important;
            align-items: center !important;
            margin-top: 2mm !important;
          }
          .logo svg, .logo img {
            width: 11mm !important;
            height: 11mm !important;
            margin-right: 3mm !important;
          }
          .logo .word {
            font-weight: 600 !important;
            font-size: 15pt !important;
            color: #0a3d47 !important;
            line-height: 1 !important;
          }
          .logo .word span {
            font-weight: 300 !important;
            color: #0f766e !important;
          }
          .verify {
            display: flex !important;
            align-items: center !important;
            text-align: right !important;
            font-size: 6.8pt !important;
            color: #5b6776 !important;
            line-height: 1.6 !important;
          }
          .verify > div:first-child {
            margin-right: 3.5mm !important;
          }
          .verify b {
            font-weight: 600 !important;
            color: #0a3d47 !important;
            letter-spacing: 0.04em !important;
            font-size: 7.6pt !important;
          }
          .verify .qr {
            width: 21mm !important;
            height: 21mm !important;
            background: #fff !important;
            padding: 1.6mm !important;
            border-radius: 2.4mm !important;
            box-shadow: 0 0 0 0.3mm #dfe6e8 !important;
          }
          .verify .qr img, .verify .qr canvas {
            width: 100% !important;
            height: 100% !important;
            display: block !important;
          }
          .main {
            position: absolute !important;
            left: 22mm !important;
            right: 22mm !important;
            top: 39mm !important;
            height: 106mm !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
          }
          .eyebrow {
            display: flex !important;
            align-items: center !important;
            font-weight: 600 !important;
            font-size: 8.2pt !important;
            letter-spacing: 0.3em !important;
            color: #0f766e !important;
            text-transform: uppercase !important;
          }
          .eyebrow i {
            display: block !important;
            width: 16mm !important;
            height: 0.3mm !important;
            background: #0f766e !important;
            opacity: 0.55 !important;
          }
          .eyebrow i:first-child { margin-right: 4mm !important; }
          .eyebrow i:last-child { margin-left: 4mm !important; }
          .lead {
            margin-top: 6mm !important;
            font-weight: 400 !important;
            font-size: 10.5pt !important;
            color: #5b6776 !important;
          }
          .name {
            font-family: "Lora", "FreeSerif", serif !important;
            font-weight: 500 !important;
            color: #0a3d47 !important;
            line-height: 1.12 !important;
            margin-top: 3mm !important;
            max-width: 236mm !important;
          }
          .name.n1 { font-size: 44pt !important; }
          .name.n2 { font-size: 36pt !important; }
          .name.n3 { font-size: 30pt !important; }
          .name.n4 { font-size: 24pt !important; }
          .name.n5 { font-size: 20pt !important; }
          .name-rule {
            width: 22mm !important;
            height: 0.9mm !important;
            border-radius: 1mm !important;
            background: #f2a93b !important;
            margin-top: 4mm !important;
          }
          .lead2 {
            margin-top: 5mm !important;
            font-weight: 400 !important;
            font-size: 10.5pt !important;
            color: #5b6776 !important;
          }
          .course {
            font-weight: 500 !important;
            line-height: 1.26 !important;
            margin-top: 2mm !important;
            max-width: 205mm !important;
          }
          .course.c1 { font-size: 18pt !important; }
          .course.c2 { font-size: 15pt !important; }
          .course.c3 { font-size: 12.5pt !important; }
          .stats {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            margin-top: 7mm !important;
          }
          .stat {
            padding: 0 7.5mm !important;
            border-left: 0.3mm solid #dfe6e8 !important;
            white-space: nowrap !important;
            text-align: center !important;
            margin-bottom: 4mm !important;
          }
          .stat:first-child { border-left: none !important; }
          .stat .k {
            font-size: 6.3pt !important;
            letter-spacing: 0.2em !important;
            text-transform: uppercase !important;
            color: #5b6776 !important;
          }
          .stat .v {
            margin-top: 1.2mm !important;
            font-weight: 500 !important;
            font-size: 10.5pt !important;
            color: #0f172a !important;
          }
          .wave {
            position: absolute !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 297mm !important;
            height: 64mm !important;
            z-index: 1 !important;
            display: block !important;
          }
          .sig {
            position: absolute !important;
            bottom: 11mm !important;
            width: 58mm !important;
            text-align: center !important;
            color: #ffffff !important;
            z-index: 5 !important;
          }
          .sig.left { left: 30mm !important; }
          .sig.right { right: 30mm !important; }
          .sig .scribble {
            font-family: "Lora", "FreeSerif", serif !important;
            font-style: italic !important;
            font-size: 16pt !important;
            height: 8.5mm !important;
            line-height: 8.5mm !important;
          }
          .sig .line {
            height: 0.3mm !important;
            background: rgba(255, 255, 255, 0.6) !important;
          }
          .sig .who {
            margin-top: 1.6mm !important;
            font-weight: 500 !important;
            font-size: 8.4pt !important;
          }
          .sig .role {
            font-weight: 300 !important;
            font-size: 7.4pt !important;
            color: #b9ece6 !important;
            margin-top: 0.3mm !important;
          }
          .seal {
            position: absolute !important;
            left: 133.5mm !important;
            top: 141mm !important;
            width: 30mm !important;
            height: 39mm !important;
            z-index: 10 !important;
            display: block !important;
          }
          .sample-note {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 3.6mm !important;
            text-align: center !important;
            font-size: 6.3pt !important;
            letter-spacing: 0.1em !important;
            color: rgba(255, 255, 255, 0.55) !important;
          }
        `;

        await html2pdf()
          .set({
            margin: 0,
            filename: `certificate-${certificateId}.pdf`,
            image: { type: "png" },
            html2canvas: {
              scale: 2,
              useCORS: true,
              backgroundColor: "#fcfcfb",
              logging: false,
              scrollX: 0,
              scrollY: 0,
              onclone: (clonedDoc) => {
                // Inject all gathered styles into the cloned iframe head
                const styleEl = clonedDoc.createElement("style");
                styleEl.textContent = collectedCss + "\n" + criticalCertificateCss;
                clonedDoc.head.appendChild(styleEl);

                // Lock container and page dimensions strictly to A4 Landscape (297mm x 210mm)
                const container = clonedDoc.querySelector(".html2pdf__container");
                if (container) {
                  container.style.width = "297mm";
                  container.style.height = "210mm";
                  container.style.margin = "0";
                  container.style.padding = "0";
                  container.style.left = "0";
                  container.style.top = "0";
                  container.style.position = "absolute";
                }
                const clPage = clonedDoc.querySelector(".page");
                if (clPage) {
                  clPage.style.width = "297mm";
                  clPage.style.height = "210mm";
                  clPage.style.position = "relative";
                  clPage.style.margin = "0";
                  clPage.style.overflow = "hidden";
                  clPage.style.backgroundColor = "#fcfcfb";
                }
              },
            },
            jsPDF: {
              unit: "mm",
              format: "a4",
              orientation: "landscape",
            },
          })
          .from(page)
          .save();

      } catch (error) {
        console.error("Certificate PDF generation failed:", error);
        alert(
          "Could not generate the certificate PDF. Check the browser console for details.",
        );
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });

    console.log("Certificate initialized successfully.");
  }

  try {
    await loadScript("/qrcode.min.js", () => typeof QRCode !== "undefined");

    await loadScript(
      "/html2pdf.bundle.min.js",
      () => typeof html2pdf !== "undefined",
    );

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeCertificate, {
        once: true,
      });
    } else {
      initializeCertificate();
    }
  } catch (error) {
    console.error("Certificate initialization failed:", error);
    alert(
      "Certificate libraries could not be loaded. Verify the Web File URLs.",
    );
  }
})();
