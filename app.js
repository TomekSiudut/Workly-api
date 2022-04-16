const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const api = process.env.API_URL;

const app = express();
require("dotenv/config");

app.use(cors());
app.options("*", cors());

// Routes
const productsRouter = require("./routers/products");

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(`${api}/products`, productsRouter);

// DB connection
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

// Server
app.listen(3000, () => {
  console.log("server started");
});
