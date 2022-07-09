import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>The Everest</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="list-employees"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              All Employees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add-employee"
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
