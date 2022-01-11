import React, { useContext } from "react";
import authContext from "../store/auth-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctx = useContext(authContext);

  return (
    // <authContext.Consumer>
    //   {
    //     (ctx) => {
    // return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLoggout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>)
    //     }
    //   }
    // </authContext.Consumer>
}

export default Navigation;
