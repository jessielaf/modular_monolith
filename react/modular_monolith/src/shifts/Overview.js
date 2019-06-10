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
