import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav className={styles.Navbar}>
        <img src="./icon.ico" alt="logo" className={styles.logo} />
        <h1 className={styles.title}>Antique Coins</h1>
        <ul className={styles.nav_items}>
          <li>
            <a className={styles.nav_links} href="/shop">
              Shop
            </a>
          </li>
          <li>
            <a className={styles.nav_links} href="/about">
              About
            </a>
          </li>
          <li>
            <a className={styles.cartBtn} href="/cart">
              Cart
            </a>
          </li>
          <li>
            <a className={styles.loginBtn} href="/login">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
