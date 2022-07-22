import classes from "./Employee.module.css";
import { useState } from "react";

import EmployeeService from "../../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import * as ValidationService from "../../services/ValidationService";

const Employee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
  });

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredFirstNameIsValid = !ValidationService.isEmpty(
      employee.firstName
    );
    const enteredLastNameIsValid = !ValidationService.isEmpty(
      employee.lastName
    );
    const enteredEmailIsValid =
      !ValidationService.isEmpty(employee.email) &&
      ValidationService.isValidEmail(employee.email);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    if (formIsValid) {
      EmployeeService.addEmployee(employee).then((res) => {
        navigate("/employees/list");
      });
    }
  }

  const firstNameChangeHandler = (event) => {
    setEmployee((prevState) => {
      return { ...prevState, firstName: event.target.value };
    });
  };
  const lastNameChangeHandler = (event) => {
    setEmployee((prevState) => {
      return { ...prevState, lastName: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setEmployee((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const lastNameControlClasses = `${classes.control} ${
    formInputsValidity.lastName ? "" : classes.invalid
  }`;

  const firstNameControlClasses = `${classes.control} ${
    formInputsValidity.firstName ? "" : classes.invalid
  }`;

  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;

  return (
    <div className={classes.card}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={firstNameControlClasses}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            value={employee.firstName}
            onChange={firstNameChangeHandler}
          />
          {!formInputsValidity.firstName && (
            <p>Please enter a valid first name!</p>
          )}
        </div>
        <div className={lastNameControlClasses}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={employee.lastName}
            onChange={lastNameChangeHandler}
          />
          {!formInputsValidity.lastName && (
            <p>Please enter a valid last name!</p>
          )}
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={employee.email}
            onChange={emailChangeHandler}
          />
          {!formInputsValidity.email && (
            <p>Please enter a valid email address!</p>
          )}
        </div>
        <div className={classes.actions}>
          <button className={classes.btn}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Employee;
