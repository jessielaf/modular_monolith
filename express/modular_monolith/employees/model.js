const Sequelize = require("sequelize");
const database = require("../db/sequelize");

module.exports = database.define(
  "employees",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  },
  {
    typestamps: false
  }
);
