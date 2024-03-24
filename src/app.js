require("dotenv").config(); // for configuring environment variables
const express = require("express");
const app = express();
const index = require("./routes/index"); // index routes for homepage
const path = require("node:path");
const method_override = require("method-override");
require("./db/connect"); // for connecting to database

const publicPath = path.join(__dirname, "public"); // public folder path

app.use(method_override("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);

app.set("view engine", "ejs"); // for using ejs as view engine
app.set("views", "src/views"); // for using views folder

app.use(express.static(publicPath)); // for accessing public folder

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
