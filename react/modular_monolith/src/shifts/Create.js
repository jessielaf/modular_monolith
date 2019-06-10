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
