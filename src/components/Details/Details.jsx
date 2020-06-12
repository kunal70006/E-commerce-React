import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";
import { useLocation, useHistory } from "react-router-dom";

const Details = () => {
  const history = useHistory();
  /*const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    sellerEmail: "",
    id: "",
  });

  const location = useLocation();

  useEffect(() => {
    setCurrentItem(location.currentItem);
  }, [location]);

  return (
    <div className={styles.Details}>
      <Navbar />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsTxtContainer}>
          <h3>Item name: {currentItem.name}</h3>
          <h3>Item price: {currentItem.price}</h3>
          <h3>Item description: {currentItem.description}</h3>
          <h3>Seller email: {currentItem.sellerEmail}</h3>
        </div>
        <div className={styles.detailsImgContainer}>
          <img src={currentItem.imageUrl} alt={currentItem.name} />
        </div>
      </div>
    </div>
  );*/

  return (
    <div className={styles.details}>
      <Navbar />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsImgContainer}>
          <img
            className={styles.productImg}
            src={require("../Shop/2.jpg")}
            alt="name"
          />
        </div>
        <div className={styles.detailsTxtContainer}>
          <h3 className={styles.productName}>
            Name Lorem ipsum dolor sit amet.
          </h3>
          <h3 className={styles.sellerID}>Sold by: seller email</h3>
          <h3 className={styles.productDesc}>
            <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aliquid maxime ex ea sequi aspernatur. Fugiat, ab
            eaque. Excepturi doloremque consequuntur quos dignissimos
            praesentium, voluptate omnis laudantium obcaecati hic exercitationem
            quidem repellendus voluptates molestias vel facilis officiis numquam
            amet quis ducimus.
          </h3>
          <h3 className={styles.productPrice}>Price: $69</h3>
          <div className={styles.btns}>
            <button
              className={styles.productBtns}
              onClick={() => history.push("/shop")}
            >
              Back to Shop
            </button>
            <button
              className={styles.productBtns}
              onClick={() => history.push("/cart")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
