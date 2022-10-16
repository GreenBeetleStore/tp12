// in backend/http-polution.js
const dotenv = require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  asyncWork(() => {
    const upper = (req.query.msg || "").toUpperCase();
    res.send(upper);
  });
});
asyncWork = (callback) => {
  setTimeout(callback, 0);
};
app.listen(process.env.PORT, () => {
  console.log("Le serveur ecoute sur le port ****");
});
