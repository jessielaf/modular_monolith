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
