import classes from "./Employee.module.css";
import { useRef, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import * as ValidationService from "../../services/ValidationService";

const Employee = (props) => {
  let navigate = useNavigate();
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  /*  BEGIN - submit form handler */
  function submitFormHandler(event) {
    event.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const emailId = emailRef.current.value;

    const enteredFirstNameIsValid = !ValidationService.isEmpty(firstName);
    const enteredLastNameIsValid = !ValidationService.isEmpty(lastName);
    const enteredEmailIsValid =
      !ValidationService.isEmpty(emailId) &&
      ValidationService.isValidEmail(emailId);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    if (formIsValid) {
      const employee = {
        firstName: firstName,
        lastName: lastName,
        email: emailId,
      };

      EmployeeService.addEmployee(employee).then((res) => {
        navigate("/employees/list");
      });
    }
  }
  /*  END - submit form handler */

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
