// in backend/csrf-server.js
const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const mockUser = {
  username: "elonmusk",
  password: "badpassword",
  email: "test@exemple.com",
};
app.use(
  session({
    secret: "terminator is coming",
    name: "SESSIONID",
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: true},
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// Ensuite, dans csrf-server.js, nous devons définir les routes de notre serveur:
app.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/account");
  res.send(`
      <h1>Social Media Account - Login</h1>
      <form method="POST" action="/">
      <label> Username <input type="text" name="username"> </label>
      <label> Password <input type="password" name="password"> </label>
      <input type="submit">
      </form>
      `);
});
app.post("/", (req, res) => {
  if (
    req.body.username === mockUser.username &&
    req.body.password === mockUser.password
  ) {
    req.session.user = req.body.username;
  }
  if (req.session.user) res.redirect("/account");
  else res.redirect("/");
});
app.get("/account", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.send(`
      <h1>Social Media Account - Settings</h1>
      <p> Email: ${mockUser.email} </p>
      <form method="POST" action="/update">
      <input type="text" name="email" value="${mockUser.email}">
      <input type="submit" value="Update" >
      </form>
      `);
});
app.post("/update", (req, res) => {
  if (!req.session.user) return res.sendStatus(403);
  mockUser.email = req.body.email;
  res.redirect("/");
});

// Ensuite, ajoutez ce qui suit à csrf-server.js pour démarrer le serveur:
app.listen(process.env.PORT, () => {
  console.log("Le serveur ecoute sur le port ****");
});
