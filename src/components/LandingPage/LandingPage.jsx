import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Navbar from "../Navbar/Navbar";

const LandingPage = () => {
  const history = useHistory();
  return (
    <div className={styles.LandingPage}>
      <Navbar />
      <div className={styles.heroImg}>
        <div className={styles.heroTxt}>
          <h1>Buy Antique coins from all around the world</h1>
          <button
            className={styles.heroBtn}
            onClick={() => history.push("/shop")}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
