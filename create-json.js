const fs = require("fs");

const html = fs.readFileSync("certificate.html", "utf8");

const jsonBody = JSON.stringify({ html }, null, 2);

fs.writeFileSync("request.json", jsonBody, "utf8");

console.log("Valid JSON body created in request.json");
