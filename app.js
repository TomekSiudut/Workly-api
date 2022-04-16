const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");

const api = process.env.API_URL;
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get(`${api}/products`, (req, res) => {
  res.send("this is a list of products");
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server started");
});
