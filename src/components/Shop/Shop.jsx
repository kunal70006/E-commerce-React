import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <div className={styles.Shop}>
      <Navbar />
      <div className={styles.cardContainer}>
        <div className={styles.title}>Antique Coins</div>
        <div className={styles.card}>
          <img src={require("./1.png")} alt="coin1" className={styles.image} />
          <div className={styles.container}>
            <h4>coin 1</h4>
            <p className={styles.desc}>Lorem ipsum dolor sit amet.</p>
            <p className={styles.price}>$69</p>
            <button className={styles.toCartBtn}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
