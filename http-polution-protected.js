// in backend/http-polution-protected.js
const dotenv = require("dotenv").config();
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  asyncWork(() => {
    let msg = req.query.msg;
    if (Array.isArray(msg)) msg = msg.pop();
    let upper = (msg || "").toUpperCase();
    res.send(upper);
  });
});
asyncWork = (callback) => {
  setTimeout(callback, 0);
};
app.listen(process.env.PORT, () => {
  console.log("Le serveur ecoute sur le port ****");
});
