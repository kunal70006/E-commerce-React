import React from "react";
import { Navbar } from "../../components";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.About}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.details}>
          <h1>GitHub Link for the project</h1>
          <a
            href="https://github.com/kunal70006/E-commerce-React"
            target="_blank"
          >
            GitHub
          </a>
          <h3>Created by Kunal and Taran</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
