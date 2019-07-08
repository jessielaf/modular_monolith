The versions used are:

-   Node 10.15.3

-   npm 6.4.1

-   express 4.17.1

First install the express generator:

      npm init -y
      npm install sequelize mysql2 express @babel/core @babel/cli @babel/node body-parser sequelize-cli --save
      npm install @babel/preset-env nodemon --save-dev

In order to use EcmaScript6 there needs to be a `.babelrc` file with:

      {
        "presets": ["@babel/preset-env"]
      }

Node js obviously works very well with JSON. To define our modules we
create `modules.json`

      ["employees", "shifts"]

First the database connection will be created using sequelize in `db.js`

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

Now the entry file can be created in `index.js`

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

Now the api definition in `api.js`

      export default class Api {
        static modelPath() {
          return "model.js";
        }

        static views(app) {
          console.error("Add views to the api");
        }
      }

Next up is creating the employee module. First up is the model. First we
create the migration by running

      sequelize migration:create --name create_employee_table

Now there should be a file in the `migrations` folder ending with
`create_employee_table`. Update this file with

      'use strict';
      module.exports = {
        up: (queryInterface, Sequelize) => {
          return queryInterface.createTable('Employees', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            name: {
              type: Sequelize.STRING
            },
            birth_date: {
              type: Sequelize.DATE
            },
            email: {
              type: Sequelize.STRING
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          });
        },
        down: (queryInterface, Sequelize) => {
          return queryInterface.dropTable('Employees');
        }
      };

Next the model can be created in `employees/model.js`

      export default (sequelize, DataTypes) => {
        const Employee = sequelize.define(
          "Employee",
          {
            name: DataTypes.STRING,
            birth_date: DataTypes.DATE,
            email: DataTypes.STRING
          },
          {}
        );

        return Employee;
      };

And to finish the employee api create the file `employees/api.js`

      import Api from "../api";

      const prefix = "/employees/";

      export default class EmployeeApi extends Api {
        static views(app, db) {
          const Employee = db.Employee;

          app.post(prefix, function(req, res) {
            Employee.create(req.body).then(employee => {
              res.json(employee);
            });
          });

          app.get(prefix, function(req, res) {
            Employee.findAll().then(employees => {
              res.json(employees);
            });
          });

          app.get(prefix + ":id/", function(req, res) {
            Employee.findByPk(req.params.id).then(employee => {
              res.json(employee);
            });
          });
        }
      }

Next is the shift module. Again create the migrations:

      sequelize migration:create --name create_shift_table

Now fill the file in the `migrations` folder ending with
`create_shift_table` with

      "use strict";

      module.exports = {
        up: (queryInterface, Sequelize) => {
          return queryInterface.createTable("Shifts", {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            title: {
              type: Sequelize.STRING
            },
            start: {
              type: Sequelize.STRING
            },
            end: {
              type: Sequelize.DATE
            }
          });
        },

        down: (queryInterface, Sequelize) => {
          return queryInterface.dropTable("Shifts");
        }
      };

Now create the model in `shifts/model.js`

      export default (sequelize, DataTypes) => {
        const Shift = sequelize.define(
          "Shift",
          {
            title: DataTypes.STRING,
            start: DataTypes.STRING,
            end: DataTypes.DATE
          },
          {}
        );

        Shift.associate = models => {
          models.Shift.belongsToMany(models.Employee, {
            onDelete: "CASCADE",
            through: "ShiftEmployee"
          });
        };

        return Shift;
      };

And finish it by creating the api in `shifts/api.js`

      import Api from "../api";

      const prefix = "/shifts/";

      export default class ShiftApi extends Api {
        static views(app, db) {
          const Shift = db.Shift;

          const withEmployee = {
            include: [
              {
                model: db.Employee,
                through: "ShiftEmployee"
              }
            ]
          };

          app.post(prefix, (req, res) => {
            Shift.create(req.body).then(async shift => {
              await shift.setEmployees(req.body.employees);
              res.json(shift);
            });
          });

          app.get(prefix, function(req, res) {
            Shift.findAll(withEmployee).then(shifts => {
              res.json(shifts);
            });
          });

          app.get(prefix + ":id/", function(req, res) {
            Shift.findByPk(req.params.id, withEmployee).then(shift => {
              res.json(shift);
            });
          });
        }
      }

Add the start script to package.json

      {
        ...
        "scripts": {
          "start": "nodemon index.js --watch server --exec babel-node"
        }
      }

Now run `npm start` in your terminal
