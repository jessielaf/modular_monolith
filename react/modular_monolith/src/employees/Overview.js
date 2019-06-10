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
