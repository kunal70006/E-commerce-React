import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Shop.module.css";

const Shop = () => {
  const items = [
    {
      name: "coin 2",
      desc: "lorem ipsum hurr durr brr",
      price: 70,
    },
    {
      name: "coin 3",
      desc: "lorem ipsum hurr durr brr",
      price: 71,
    },
    {
      name: "coin 4",
      desc: "lorem ipsum hurr durr brr",
      price: 72,
    },
    {
      name: "coin 5",
      desc: "lorem ipsum hurr durr brr",
      price: 73,
    },
    {
      name: "coin 6",
      desc: "lorem ipsum hurr durr brr",
      price: 74,
    },
    {
      name: "coin 7",
      desc: "lorem ipsum hurr durr brr ajdojsdsadkjasdljsalddsadad",
      price: 75,
    },
  ];

  return (
    <div className={styles.Shop}>
      <Navbar />
      <div className={styles.title}>Antique Coins</div>
      <div className={styles.container}>
        {items.map((item) => {
          return (
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <img
                  src={require("./5.png")}
                  alt="coin1"
                  className={styles.image}
                />
                <div className={styles.aboutCardContainer}>
                  <h4>{item.name}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                  <p className={styles.price}>${item.price}</p>
                  <button className={styles.toCartBtn}>Add to cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
