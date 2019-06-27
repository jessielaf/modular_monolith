import express from "express";
import db from "./db";
import modules from "./modules";
import bodyParser from "body-parser";

var app = express();

app.use(bodyParser.json());

modules.forEach(module => {
  require(`./${module}/api`).default.views(app, db);
});

app.listen(8000, () => {
  db.sequelize.sync();
});
