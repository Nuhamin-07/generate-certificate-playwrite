const fs = require("fs");

let html = fs.readFileSync("certificate.html", "utf8");

// Use the active template only.
// Remove the commented-out first copy if your file contains two copies.
const activeTemplateStart = html.lastIndexOf("<!doctype html>");

if (activeTemplateStart !== -1) {
  html = html.slice(activeTemplateStart);
}

// Sample certificate data
const values = {
  certificate_id: "EM360-2026-001",
  verify_host: "edumarket360.com",
  certificate_kind: "CERTIFICATE OF COMPLETION",
  name_class: "n1",
  learner_name: "Nuhamin Gulilat",
  course_class: "c1",
  course_title: "Web Development",
  cobrand_html: "",
  stats_html: `
    <div class="stat">
      <div class="k">COMPLETION DATE</div>
      <div class="v">October 19, 2026</div>
    </div>
  `,
  extra_line_html: "",
  signer1_scribble: "EduMarket360",
  signer1_name: "Course Director",
  signer1_role: "EduMarket360",
  signer2_scribble: "Authorized",
  signer2_name: "Training Manager",
  signer2_role: "EduMarket360",
  qr_svg: "",
  sample_note: "SAMPLE CERTIFICATE",
};

// Replace each {{placeholder}} with its corresponding value.
for (const [key, value] of Object.entries(values)) {
  html = html.replaceAll(`{{${key}}}`, value);
}

// Ensure the HTML is correctly encoded as JSON.
const jsonBody = JSON.stringify({ html }, null, 2);

fs.writeFileSync("request.json", jsonBody, "utf8");

console.log("Valid JSON body created in request.json");
