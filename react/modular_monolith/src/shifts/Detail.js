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
