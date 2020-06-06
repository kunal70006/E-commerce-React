import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";

const Details = ({ name, price }) => {
  return (
    <div className={styles.Details}>
      <Navbar />
      {console.log(`${name} + ${price}`)}
      <h1>In details</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
        tempora?
      </p>
    </div>
  );
};

export default Details;
