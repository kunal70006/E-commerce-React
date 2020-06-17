import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import firebase from "../../Firebase";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Cart = () => {
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  let total = 0;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let tempItems = [];

        firebase
          .firestore()
          .collection("users")
          .doc(user.email)
          .collection("cart")
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              const cartItemObj = {
                name: doc.data().name,
                price: doc.data().price,
                quantity: doc.data().quantity,
                image: doc.data().image,
                sellerEmail: doc.data().sellerEmail,
              };
              tempItems.push(cartItemObj);
            });
          })
          .then(() => {
            setCartItems(tempItems);
          });
      } else {
        alert("You have to log in to see this page");
        history.push("/login");
      }
    });
  }, []);

  const handleQtyChange = () => {
    //TODO add inc/dec fn to qty
  };

  return (
    <div className={styles.Cart}>
      <Navbar />
      <div className={styles.itemContainer}>
        <h1 className={styles.title}>shopping bag</h1>
        <div className={styles.container}>
          {cartItems.map((item, index) => {
            {
              total += Number(item.price);
            }
            return (
              <div className={styles.item} key={index}>
                <img className={styles.img} alt="item" src={item.image} />
                <h3 className={styles.name}>{item.name}</h3>
                <h3 className={styles.sellerEmail}>{item.sellerEmail}</h3>
                <h3 className={styles.qty}>
                  <span>
                    <button
                      className={styles.qtyBtns}
                      onClick={() => item.quantity++}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      className={styles.qtyBtns}
                      onClick={() =>
                        item.quantity > 1
                          ? item.quantity--
                          : (item.quantity = 1)
                      }
                    >
                      -
                    </button>
                  </span>
                </h3>
                <h3 className={styles.total}>
                  $
                  {`
                  ${item.price * item.quantity}`}
                </h3>
              </div>
            );
          })}
          <p className={styles.finalPrice}>Total: ${total}</p>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className={styles.paymentBtn}
          >
            Pay now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
