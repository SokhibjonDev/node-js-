const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { create } = require("express-handlebars");
// const mongoose = require('mongoose')

const homePage = require("./routers/homePage");

require("dotenv").config();

const exhbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine("hbs", exhbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

// const loggerMiddleware = require('./middleware/logger')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homePage);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

try {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log("Start", port, "port");
  });
} catch (error) {
  if (error) {
    console.error(error);
  }
}
