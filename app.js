const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

const usersRoutes = require("./routers/users");

const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "workly-database",
  })
  .then(() => {
    console.log("Database Connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
