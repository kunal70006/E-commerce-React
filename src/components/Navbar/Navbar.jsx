import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Firebase";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserExists(true);
      } else {
        setUserExists(false);
      }
    });
  }, []);

  if (!toggle) {
    return (
      <div className={styles.Navbar}>
        <nav>
          <button
            className={styles.hamBurger}
            onClick={() => setToggle(!toggle)}
          >
            <div className={styles.lines}></div>
            <div className={styles.lines}></div>
            <div className={styles.lines}></div>
          </button>

          <ul className={styles.nav}>
            <li className={styles.navLinks}>
              <div className={styles.header}>
                <img
                  src={require("./icon.ico")}
                  alt="logo"
                  className={styles.logo}
                />
                <h2 className={styles.title} onClick={() => history.push("/")}>
                  Amaxon
                </h2>
              </div>
            </li>

            <li className={styles.navLinks}>
              <h2 onClick={() => history.push("/shop")}>Shop</h2>
            </li>

            <li className={styles.navLinks}>
              <h2 onClick={() => history.push("/about")}>About</h2>
            </li>

            <li className={styles.navLinks}>
              {userExists ? (
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
              ) : (
                <button
                  className={styles.navBtns}
                  onClick={() => history.push("/login")}
                >
                  Login
                </button>
              )}
            </li>

            <li className={styles.navLinks}>
              <button
                className={styles.navBtns}
                onClick={() => history.push("/profile")}
              >
                Profile
              </button>
            </li>

            <li className={styles.navLinks}>
              <button
                className={styles.navBtns}
                onClick={() => history.push("/cart")}
              >
                Cart
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className={styles.burgerNav}>
        <button
          className={styles.hamhamBurger}
          onClick={() => setToggle(!toggle)}
        >
          <div className={styles.lines}></div>
          <div className={styles.lines}></div>
          <div className={styles.lines}></div>
        </button>
        <div className={styles.burgerNavLinks}>
          <h2 onClick={() => history.push("/shop")}>Shop</h2>
        </div>
        <div className={styles.burgerNavLinks}>
          <h2 onClick={() => history.push("/about")}>About</h2>
        </div>
        <div className={styles.burgerNavLinks}>
          {userExists ? (
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
          ) : (
            <button
              className={styles.navBtns}
              onClick={() => history.push("/login")}
            >
              Login
            </button>
          )}
        </div>
        <div className={styles.burgerNavLinks}>
          <button
            className={styles.navBtns}
            onClick={() => history.push("/profile")}
          >
            Profile
          </button>
        </div>
        <div className={styles.burgerNavLinks}>
          <button
            className={styles.navBtns}
            onClick={() => history.push("/cart")}
          >
            Cart
          </button>
        </div>
      </div>
    );
  }
};

export default Navbar;
