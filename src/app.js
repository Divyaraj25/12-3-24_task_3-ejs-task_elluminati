require("dotenv").config();
const express = require("express");
const app = express();
const index = require("./routes/index");
const path = require("node:path");
const method_override = require("method-override");
require("./db/connect");

const publicPath = path.join(__dirname, "public");

app.use(method_override("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
