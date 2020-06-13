import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  /*return (
    <div className={styles.parent}>
      <nav className={styles.Navbar}>
        <div className={styles.links}>
          <img src="./icon.ico" alt="logo" className={styles.logo} />
          <div className={styles.title} onClick={() => history.push("/")}>
            Antique Coins
          </div>
          <div
            className={styles.nav_links}
            onClick={() => history.push("/shop")}
          >
            Shop
          </div>
          <div
            className={styles.nav_links}
            onClick={() => history.push("/about")}
          >
            About
          </div>
        </div>
        <div className={styles.cartBtn} onClick={() => history.push("/cart")}>
          Cart
        </div>
        <div className={styles.loginBtn} onClick={() => history.push("/login")}>
          Login
        </div>
      </nav>
    </div>
  );

  const handleToggle = (event) => {
    //event.preventDefault();
    toggle = true;
    console.log(toggle);
  };*/

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
            <li className={styles.links}>
              <button
                className={styles.navBtns}
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            </li>
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
