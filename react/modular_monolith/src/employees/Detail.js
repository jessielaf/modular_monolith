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
