import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import classes from "./ListEmployees.module.css";
import { useNavigate } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
// import { IconContext } from "react-icons";

const ListEmployeeComponent = (props) => {
  const [employees, setEmployees] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      console.log(res.data);
      setEmployees(res.data);
    });
  }, []);

  const addEmployeeHandler = (event, param) => {
    navigate("/employees/add");
  };

  const editEmployeeHandler = (event, param) => {
    event.preventDefault();
    navigate("/employees/edit/param");
  };

  const deleteEmployeeHandler = (event, param) => {
    event.preventDefault();
    EmployeeService.deleteEmployee(param).then((res) => {
      EmployeeService.getEmployees().then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      });
    });
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
                  {/* <IconContext.Provider
                    value={{ className: classes.icon, size: 30 }}
                  >
                    <>
                      <FcEditImage />
                      <FcEmptyTrash />
                    </>
                  </IconContext.Provider> */}
                  <button
                    className={classes.icon}
                    onClick={(event) => editEmployeeHandler(event, employee.id)}
                  >
                    <FcEditImage size={20} />
                  </button>
                  <button
                    className={classes.icon}
                    onClick={(event) =>
                      deleteEmployeeHandler(event, employee.id)
                    }
                  >
                    <FcEmptyTrash size={20} />
                  </button>
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
