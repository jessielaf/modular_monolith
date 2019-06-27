import modules from "./modules.json";
import path from "path";
import Sequelize from "sequelize";

const db = {};

const sequelize = new Sequelize("express", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: false
});

modules.forEach(module => {
  const api = require("./" + module + "/api.js").default;

  const model = sequelize.import(path.join(__dirname, module, api.modelPath()));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
