import Api from "../api";

const prefix = "/shifts/";

export default class ShiftApi extends Api {
  static views(app) {
    const db = require("../db");
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
