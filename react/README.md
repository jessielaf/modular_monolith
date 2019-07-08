The versions used are:

-   React 16.8.6

-   Node 10.15.3

-   npm 6.4.1

First thing to do is start the react app by running:

      npx create-react-app modular_monolith

React does not come with it's own router. Thus you have to install one.
The most used is react router. You can install this by running

      npm install --save react-router-dom

React does not have it's own HTTP client. So it needs to be installed:

      npm install --save axios

React also does not have its own package so we can install
`http-proxy-middleware`

      npm install --save http-proxy-middleware

And create the proxy in `src/setupProxy.js` and paste this init:

      const proxy = require("http-proxy-middleware");

      module.exports = function(app) {
        app.use(
          proxy("/api", {
            target: "http://localhost:8000",
            pathRewrite: {
              "^/api": ""
            }
          })
        );
      };

Now create the api between modules in `src/api.js`

      export default class Api {
        static create(object) {
          console.log(object, "not saved");
          console.error("Implement the create functionality");
        }

        static retrieve(id) {
          console.log(id, "not retrieved");
          console.error("Implement the retrieve functionality");
        }

        static overview() {
          console.error("Implement the overview functionality");
        }

        static route() {
          console.error("Returns the route for the router");
        }
      }

Now the first create the employee. Start with the overview:

src/employees/Overview.js

      import React from "react";
      import { Link } from "react-router-dom";
      import EmployeeApi from "./api";

      class Overview extends React.Component {
        constructor() {
          super();
          this.state = {
            employees: []
          };
        }

        componentDidMount() {
          EmployeeApi.overview().then(response => {
            this.setState({
              employees: response.data
            });
          });
        }

        render() {
          const employeesView = [];

          this.state.employees.forEach(employee => {
            employeesView.push(
              <li key={employee.id}>
                <Link to={"/employee/" + employee.id}>{employee.name}</Link>
              </li>
            );
          });

          return (
            <div>
              <ul>{employeesView}</ul>
              <Link to="/employees/create">Create employee</Link>
            </div>
          );
        }
      }

      export default Overview;

Now the creation form:

src/employees/Create.js

      import React from "react";
      import EmployeeApi from "./api";

      class Overview extends React.Component {
        constructor() {
          super();
          this.state = {
            employee: {
              name: "",
              birth_date: "",
              email: ""
            }
          };
        }

        handleInputChange(event) {
          const target = event.target;
          const employee = this.state.employee;
          employee[target.name] = target.value;

          this.setState({
            employee: employee
          });
        }

        submit(event) {
          event.preventDefault();
          EmployeeApi.create(this.state.employee).then(() => {
            this.props.history.push("/employees");
          });
        }

        render() {
          return (
            <form onSubmit={this.submit.bind(this)}>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  id="name"
                  value={this.state.employee.name}
                  onChange={this.handleInputChange.bind(this)}
                  placeholder="Name"
                  type="text"
                  name="name"
                />
              </div>

              <div>
                <label htmlFor="birthDate">Birth date: </label>
                <input
                  id="birthDate"
                  value={this.state.employee.birth_date}
                  onChange={this.handleInputChange.bind(this)}
                  placeholder="01-04-1998"
                  type="text"
                  name="birth_date"
                />
              </div>

              <div>
                <label htmlFor="email">Email: </label>
                <input
                  id="email"
                  value={this.state.employee.email}
                  onChange={this.handleInputChange.bind(this)}
                  placeholder="jessie@example.com"
                  type="email"
                  name="email"
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          );
        }
      }

      export default Overview;

And last of all the detail view:

src/employees/Detail.js

      import React from "react";
      import EmployeeApi from "./api";

      class Overview extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            employee: {}
          };
        }

        componentDidMount() {
          EmployeeApi.retrieve(this.props.match.params.id).then(response => {
            this.setState({
              employee: response.data
            });
          });
        }

        render() {
          return (
            <div>
              {this.state.employee.name}

              <div>
                Shifts:
                <ul>
                  {this.state.employee.shifts &&
                    this.state.employee.shifts.map(shift => (
                      <li key={shift.id}>{shift.title}</li>
                    ))}
                </ul>
              </div>
            </div>
          );
        }
      }

      export default Overview;

So when creating the route the need was to create three urls:

-   /employees/ as overview

-   /employees/create/ which is the create url

-   /employees/:id/ which is the detail view

But the problem was that the detail view and the create view would
merge. This is because the detail is seeing create as the id. Thus the
url `/employees/:id/` to `/employee/:id`. This is not expected from a
framework.

Now create the shift module

src/shifts/Overview.js

      import React from "react";
      import { Link } from "react-router-dom";
      import shiftApi from "./api";

      class Overview extends React.Component {
        constructor() {
          super();
          this.state = {
            shifts: []
          };
        }

        componentDidMount() {
          shiftApi.overview().then(response => {
            this.setState({
              shifts: response.data
            });
          });
        }

        render() {
          const shiftsView = [];

          this.state.shifts.forEach(shift => {
            shiftsView.push(
              <li key={shift.id}>
                <Link to={"/shift/" + shift.id}>{shift.title}</Link>
              </li>
            );
          });

          return (
            <div>
              <ul>{shiftsView}</ul>
              <Link to="/shifts/create">Create shift</Link>
            </div>
          );
        }
      }

      export default Overview;

src/shifts/Create.js

      import React from "react";
      import shiftApi from "./api";
      import EmployeeApi from "../employees/api";

      class Overview extends React.Component {
        constructor() {
          super();
          this.state = {
            shift: {
              title: "",
              start: "",
              end: "",
              employees: []
            },
            employees: []
          };
        }

        componentDidMount() {
          EmployeeApi.overview().then(response => {
            this.setState({
              employees: response.data
            });
          });
        }

        handleInputChange(event) {
          const target = event.target;
          const shift = this.state.shift;
          shift[target.name] = target.value;

          this.setState({
            shift: shift
          });
        }

        handleMultiSelect(event) {
          var options = event.target.options;
          const values = [];

          for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              values.push(options[i].value);
            }
          }

          const shift = this.state.shift;
          shift[event.target.name] = values;

          this.setState({
            shift: shift
          });
        }

        submit(event) {
          event.preventDefault();
          shiftApi.create(this.state.shift).then(() => {
            this.props.history.push("/shifts");
          });
        }

        render() {
          return (
            <form onSubmit={this.submit.bind(this)}>
              <div>
                <label htmlFor="title">Title: </label>
                <input
                  id="title"
                  value={this.state.shift.title}
                  onChange={this.handleInputChange.bind(this)}
                  placeholder="Title"
                  type="text"
                  name="title"
                />
              </div>

              <div>
                <label htmlFor="start">Start: </label>
                <input
                  id="start"
                  value={this.state.shift.start}
                  onChange={this.handleInputChange.bind(this)}
                  placeholder="01-01-2019"
                  type="text"
                  name="start"
                />
              </div>

              <div>
                <label htmlFor="end">End: </label>
                <input
                  id="end"
                  value={this.state.shift.end}
                  onChange={this.handleInputChange.bind(this)}
                  placeholder="01-01-2019"
                  type="text"
                  name="end"
                />
              </div>

              <div>
                <label htmlFor="employees">Employees: </label>
                <select
                  id="employees"
                  value={this.state.shift.employees}
                  onChange={this.handleMultiSelect.bind(this)}
                  multiple={true}
                  name="employees"
                >
                  {this.state.employees.map(employee => {
                    return (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button type="submit">Submit</button>
            </form>
          );
        }
      }

      export default Overview;

The unfortunate thing that was clear when working with react is that it
was needed to create a handler for each different input type.

src/shifts/Detail.js

      import React from "react";
      import shiftApi from "./api";

      class Overview extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            shift: {}
          };
        }

        componentDidMount() {
          shiftApi.retrieve(this.props.match.params.id).then(response => {
            this.setState({
              shift: response.data
            });
          });
        }

        render() {
          return (
            <div>
              {this.state.shift.name}

              <div>
                Shifts:
                <ul>
                  {this.state.shift.employees &&
                    this.state.shift.employees.map(employee => (
                      <li key={employee.id}>{employee.name}</li>
                    ))}
                </ul>
              </div>
            </div>
          );
        }
      }

      export default Overview;

In the end there needs to be an replacement in `src/App.js`

      import React from "react";
      import { BrowserRouter as Router, Link } from "react-router-dom";
      import EmployeeApi from "./employees/api";
      import ShiftApi from "./shifts/api";

      function AppRouter() {
        const shiftStyle = {
          marginLeft: "10px"
        };

        return (
          <Router>
            <div>
              <Link to="/employees">Employees</Link>
              <Link to="/shifts/" style={shiftStyle}>
                Shifts
              </Link>

              {EmployeeApi.route()}
              {ShiftApi.route()}
            </div>
          </Router>
        );
      }

      export default AppRouter;

Now the application is able to run with the command:

      npm start
