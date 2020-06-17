import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import firebase from '../../Firebase'
import { useHistory } from "react-router-dom";

const Cart = () => {

  const history = useHistory();
  const [cartItems, setCartItems] = useState([])

  useEffect( () => {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        let tempItems = []

        firebase.firestore().collection('users').doc(user.email).collection('cart').get().then( (docs) => {
          docs.forEach( (doc) => {
            const cartItemObj = {
              name: doc.data().name,
              price: doc.data().price, 
              quantity: doc.data().quantity,
              image: doc.data().image,
              sellerEmail: doc.data().sellerEmail
            }
            tempItems.push(cartItemObj)
          })
        }).then( () => {
          setCartItems(tempItems)
        })
      } else {
        alert("You have to log in to see this page")
        history.push('/login')        
      }
    })
  }, [])

  return (
    <div className={styles.Cart}>
      <h1>Here's the data. Format it however you like. Also if you dont see any items, add some first</h1>
      {
        cartItems.map( (item) => {
          return (
            <div>
              <h3>Name: {item.name} </h3>
              <h3>Price: {item.price} </h3>
              <h3>Quantity: {item.quantity} </h3>
              <h3>Seller: {item.sellerEmail} </h3>
              <img src={item.image}/>
            </div> 
          )
        })
      }
    </div>
  );
};

export default Cart;
