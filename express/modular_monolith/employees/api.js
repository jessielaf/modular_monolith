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
