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
      let id = sessionStorage.getItem("brens")
      firebase.firestore().collection("items").doc(id).get().then( (data) => {
        setCurrentItem(data.data()) 
      })
    } else {
      sessionStorage.setItem("brens", location.id);
      firebase.firestore().collection("items").doc(location.id).get().then( (data) => {
        setCurrentItem(data.data()) 
      })
    }
  }, []);

  const addToCartButtonDidClick = () => {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        const itemInCartObj = {
          name: currentItem.name,
          price: currentItem.price,
          image: currentItem.imageUrl,
          itemId: sessionStorage.getItem("brens"),
          sellerEmail: currentItem.sellerEmail,
          quantity: 1
        }

        firebase.firestore().collection('users').doc(user.email).collection('cart').where('itemId', '==', itemInCartObj.itemId).get().then( (docs) => {
          if (docs.docs.length === 0) {
            firebase.firestore().collection('users').doc(user.email).set({email: user.email}).then( (doc) => {
              firebase.firestore().collection('users').doc(user.email).collection('cart').add(itemInCartObj).then( () => {
                alert("Item added successfully")
              })
            })
          } else {
            alert("Item already in cart")
          } 
        })
      } else {
        alert("You have to log in to add this item to your cart")
        history.push('/login')
      }
    })
  }

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
              onClick={() => addToCartButtonDidClick()}
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
