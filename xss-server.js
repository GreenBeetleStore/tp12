// in backend/xss-server.js
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const he = require("he");
const escapeHTML = require("escape-html");

app.get("/", (req, res) => {
  const { previous, lang, token } = req.query;
  getServiceStatus((status) => {
    // const href = he.encode(`${previous}${token}/${lang}`);
    const href = escapeHTML(`${previous}${token}/${lang}`);
    res.send(`
 <h1>Service Status</h1>
 <div id=status>
 ${status}
 </div>
 <div>
 <a href="${href}">Back</a>
 </div>
 `);
  });
});
getServiceStatus = (callback) => {
  const status = "Tous les systèmes fonctionnent.";
  callback(status);
};
app.listen(process.env.PORT, () => {
  console.log("Le serveur ecoute sur le port ****");
});
