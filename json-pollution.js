// in backend/json-pollution.js
const dotenv = require("dotenv").config();
const http = require("http");
const { STATUS_CODES } = http;
const Ajv = require("ajv");
const ajv = new Ajv();
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/") {
    bonjour(req, res);
    return;
  }
  res.statusCode = 404;
  res.end(STATUS_CODES[res.statusCode]);
});
const schema = {
  title: "Bonjour",
  properties: {
    msg: { type: "string" },
    name: { type: "string" },
  },
  additionalProperties: false,
  required: ["msg"],
};
const validate = ajv.compile(schema);
bonjour = (req, res) => {
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", () => {
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.end("");
      return;
    }
    if (!validate(data, schema)) {
      res.end("");
      return;
    }
    if (data.hasOwnProperty("name")) {
      res.end(`${data.msg} ${data.name}`);
    } else {
      res.end(data.msg);
    }
  });
};
server.listen(process.env.PORT, () => {
  console.log("Le serveur ecoute sur le port ****");
});
