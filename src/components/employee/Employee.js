import classes from "./Employee.module.css";
import { useRef, useState } from "react";

import EmployeeService from "../../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import * as ValidationService from "../../services/ValidationService";

const Employee = () => {
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
  });

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredFirstNameIsValid = !ValidationService.isEmpty(
      firstNameRef.current.value
    );
    const enteredLastNameIsValid = !ValidationService.isEmpty(
      lastNameRef.current.value
    );
    const enteredEmailIsValid =
      !ValidationService.isEmpty(emailRef.current.value) &&
      ValidationService.isValidEmail(emailRef.current.value);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    if (formIsValid) {
      EmployeeService.addEmployee({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
      }).then((res) => {
        navigate("/employees/list");
      });
    }
  }

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
          <input type="text" id="firstname" ref={firstNameRef} />
          {!formInputsValidity.firstName && (
            <p>Please enter a valid first name!</p>
          )}
        </div>
        <div className={lastNameControlClasses}>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" ref={lastNameRef} />
          {!formInputsValidity.lastName && (
            <p>Please enter a valid last name!</p>
          )}
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={emailRef} />
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
