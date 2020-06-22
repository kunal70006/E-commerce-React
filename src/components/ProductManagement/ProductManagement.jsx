import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./ProductManagement.module.css";

const ProductManagement = () => {
  const [items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let tempItems = [];
    firebase
      .firestore()
      .collection("items")
      .where("sellerEmail", "==", localStorage.getItem("email"))
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const itemObj = {
            name: doc.data().name,
            price: doc.data().price,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
            itemId: doc.id,
          };
          tempItems.push(itemObj);
        });
      })
      .then(() => {
        setItems(tempItems);
      });
  }, []);

  return (
    <div className={styles.ProductManagement}>
      <Navbar />
      <h2 className={styles.title}>Listings</h2>
      <div className={styles.productManagementContainer}>
        {items.map((item) => {
          return (
            <div key={item.itemId} className={styles.item}>
              <h3 className={styles.name}>{item.name} </h3>
              <h3 className={styles.price}>${item.price} </h3>
              <h3 className={styles.desc}>{item.description} </h3>
              <img className={styles.img} src={item.imageUrl} alt={item.name} />
              <button
                className={styles.editBtn}
                onClick={() => {
                  console.log("bruhhh");
                  history.push({
                    pathname: "/edit",
                    itemId: item.itemId,
                  });
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductManagement;
