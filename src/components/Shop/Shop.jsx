import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "../../components";
import styles from "./Shop.module.css";
import firebase from "../../Firebase";

const Shop = () => {
  const [items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let tempItems = [];

    firebase
      .firestore()
      .collection("items")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const itemObj = {
            name: doc.data().name,
            price: doc.data().price,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
            sellerEmail: doc.data().sellerEmail,
            id: doc.id,
          };
          tempItems.push(itemObj);
        });
      })
      .then(() => {
        setItems(tempItems);
      });
  }, []);

  return (
    <div className={styles.Shop}>
      <Navbar />
      <div className={styles.title}>Antique Coins</div>
      <div className={styles.container}>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.cardContainer}
              onClick={() => {
                history.push({
                  pathname: "/details",
                  currentItem: item,
                });
              }}
            >
              <div className={styles.card}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.image}
                />
                <div className={styles.aboutCardContainer}>
                  <h4>{item.name}</h4>
                  <p className={styles.price}>${item.price}</p>
                  <button className={styles.details}>Details</button>
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
