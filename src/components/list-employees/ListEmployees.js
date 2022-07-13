import React, { Component } from "react";
import EmployeeService from "../../services/EmployeeService";
import classes from "./ListEmployees.module.css";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
  }

  addEmployee() {
    this.props.history.push("/add-employee");
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  render() {
    return (
      <div className={classes.panel}>
        <div className={classes.row}>
          <div className={classes.heading}>Employee List</div>
          <button className={classes.btn} onClick={this.addEmployee}>
            Add an Employee
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <a href="">Edit</a>&nbsp;<a href="">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
