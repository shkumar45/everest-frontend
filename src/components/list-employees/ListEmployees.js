import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import classes from "./ListEmployees.module.css";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = (props) => {
  const [employees, setEmployees] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      console.log(res.data);
      setEmployees(res.data);
    });
  }, []);

  const addEmployeeHandler = (event) => {
    navigate("/employees/add");
  };

  return (
    <div className={classes.panel}>
      <div className={classes.actions}>
        <div>Employee List:</div>
        <button onClick={addEmployeeHandler}>Add an Employee</button>
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
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <a href="">
                    <span class="material-symbols-outlined">edit</span>
                  </a>
                  &nbsp;
                  <a href="">
                    <span class="material-symbols-outlined">delete</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
