const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => {
  console.log("Le serveur ecoute sur le port 3000");
});
