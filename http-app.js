// in backend/http-app.js
const dotenv = require("dotenv").config();
// Capçaleres Helmet.
const http = require("http");
const server = http.createServer((req, res) => {
  secureHeaders(res);
  res.end("CouCou!");
});
const secureHeaders = (res) => {
  res.setHeader("X-DNS-Prefetch-Control", "off");
  res.setHeader("Expect-CT", "max-age=0");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Download-Options", "noopen");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-XSS-Protection", "1; mode=block");
};
server.listen(process.env.PORT, () => {
  console.log("Le serveur ecoute sur le port ****");
});
