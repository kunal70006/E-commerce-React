import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";
import { useHistory, useLocation } from "react-router-dom";
import firebase from '../../Firebase'

const Details = () => {
  const history = useHistory();
  const location = useLocation();

  const email = localStorage.getItem("email")

  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    sellerEmail: "",
    id: ""
  })

  useEffect(() => {
    if (typeof location.id === 'undefined') {
      let id = sessionStorage.getItem(email)
      firebase.firestore().collection("items").doc(id).get().then( (data) => {
        setCurrentItem(data.data()) 
      })
    } else {
      sessionStorage.setItem(email, location.id);
      firebase.firestore().collection("items").doc(location.id).get().then( (data) => {
        setCurrentItem(data.data()) 
      })
    }
  }, []);

  useEffect( () => {
    console.log(currentItem)
  }, [currentItem])

  return (
    <div className={styles.details}>
      <Navbar />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsImgContainer}>
          <img
            className={styles.productImg}
            src={currentItem.imageUrl}
            alt={currentItem.name}
          />
        </div>
        <div className={styles.detailsTxtContainer}>
          <h3 className={styles.productName}>
            {currentItem.name}
          </h3>
          <h3 className={styles.sellerID}>Sold by: {currentItem.sellerEmail} </h3>
          <h3 className={styles.productDesc}>
            <strong>Description: </strong> 
            {currentItem.description}
          </h3>
          <h3 className={styles.productPrice}>Price: {currentItem.price} </h3>
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
