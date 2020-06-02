import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const history = useHistory();
  return (
    <div className={styles.parent}>
      <nav className={styles.Navbar}>
        <div className={styles.links}>
          <img src="./icon.ico" alt="logo" className={styles.logo} />
          <div className={styles.title}>Antique Coins</div>
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
};

export default Navbar;
