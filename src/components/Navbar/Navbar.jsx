import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Firebase";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  // Why it no work
  const userChecker = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        console.log("inside if");
        return (
          <button
            className={styles.navBtns}
            onClick={() => {
              firebase.auth().signOut();
              history.push("/");
              alert("You logged out");
            }}
          >
            Logout
          </button>
        );
      } else {
        console.log("inside else");
        return (
          <button
            className={styles.navBtns}
            onClick={() => history.push("/login")}
          >
            Login
          </button>
        );
      }
    });
  };

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.navLinks}>
          <div className={styles.temp1}>
            <li className={styles.header}>
              <h2 className={styles.title} onClick={() => history.push("/")}>
                <img
                  src={require("./icon.ico")}
                  alt="logo"
                  className={styles.logo}
                />
                Amaxon
              </h2>
            </li>
            <li className={styles.links}>
              <h2 onClick={() => history.push("/shop")}>Shop</h2>
            </li>
            <li className={styles.links}>
              <h2 onClick={() => history.push("/about")}>About</h2>
            </li>
          </div>
          <div className={styles.temp2}>
            <li className={styles.links}>{/*Here*/ userChecker()}</li>
            <li className={styles.links}>
              <button
                className={styles.navBtns}
                onClick={() => history.push("/cart")}
              >
                Cart
              </button>
            </li>
          </div>
        </ul>
        <div className={styles.burger} onClick={() => setToggle(!toggle)}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
