import React, { Component } from "react";
import classes from "./Footer.module.css";

class Footer extends Component {
  render() {
    return (
      <footer className={classes.footer}>
        <div>Everest is @noob company</div>
        <div>@2022 All Rights reserved</div>
      </footer>
    );
  }
}

export default Footer;
