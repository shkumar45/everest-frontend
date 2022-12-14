import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>The Everest</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="employees/list"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              All Employees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="employees/add"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add an Employee
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
