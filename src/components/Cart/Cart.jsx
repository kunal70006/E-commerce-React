import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Firebase";
import Navbar from "../Navbar/Navbar";

import styles from "./Cart.module.css";

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
                itemId: doc.data().itemId,
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

  const handleQtyChange = (event, item) => {
    firebase
      .firestore()
      .collection('users')
      .doc(localStorage.getItem('email'))
      .collection('cart')
      .where('itemId', '==', item.itemId)
      .get().then( (snapshot) => {
        const itemObj = {
          name: snapshot.docs[0].data().name,
          image: snapshot.docs[0].data().image,
          itemId: snapshot.docs[0].data().itemId,
          price: snapshot.docs[0].data().itemId,
          sellerEmail: snapshot.docs[0].data().sellerEmail,
          quantity: item.quantity
        }
        firebase
          .firestore()
          .collection('users')
          .doc(localStorage.getItem('email'))
          .collection('cart')
          .doc(snapshot.docs[0].id).update(itemObj).then( () => {
            console.log("done")
          })
      })
  };

  return (
    <div className={styles.Cart}>
      <Navbar />
      <div className={styles.itemContainer}>
        <h1 className={styles.title}>shopping bag</h1>
        <div className={styles.container}>
          {cartItems.map((item, index) => {
            {
              total += Number(item.price * item.quantity);
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
                      // onClick={() => item.quantity++}
                      onClick={() => {
                        let newItems = [...cartItems];
                        item.quantity++;
                        newItems[index] = item;
                        setCartItems(newItems);
                      }}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      className={styles.qtyBtns}
                      // onClick={() =>
                      //   item.quantity > 1
                      //     ? item.quantity--
                      //     : (item.quantity = 1)
                      // }
                      onClick={() => {
                        if (Number(item.quantity) > 1) {
                          let newItems = [...cartItems];
                          item.quantity--;
                          newItems[index] = item;
                          setCartItems(newItems);
                        }
                      }}
                    >
                      -
                    </button>
                    <button
                      className={styles.confirmBtn}
                      onClick={(event) => handleQtyChange(event, item)}
                    >
                      Confirm Changes?
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
