import React from "react";
import styles from "./LandingPage.module.css";
import Navbar from "../Navbar/Navbar";

const LandingPage = () => {
  return (
    <div className={styles.LandingPage}>
      <Navbar />
      <h1>In LandingPage</h1>
    </div>
  );
};

export default LandingPage;
