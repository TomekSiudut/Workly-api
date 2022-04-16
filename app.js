const express = require("express");
const app = express();

require("dotenv/config");

const api = process.env.API_URL;

app.get(api + "/products", (req, res) => {
  res.send("this is a list of products");
});

app.listen(3000, () => {
  console.log(api);
  console.log("server started");
});
