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
