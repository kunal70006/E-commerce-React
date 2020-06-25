import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";
import firebase from "../../Firebase";
import Navbar from "../Navbar/Navbar";

import styles from "./Cart.module.css";

const Payment = ({ checkoutPrice }) => {
  const history = useHistory();
  const onSuccess = () => {
    console.log("The payment was succeeded!");
    history.push("/");
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = () => {
    // User pressed "cancel" or close Paypal's popup!
    console.log("The payment was cancelled!");
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = "sandbox"; // you can set here to 'production' for production

  const client = {
    sandbox:
      "AVc4I8St5b9mzRqlU3Pf0u7pUN6ofztTXvAZNGr5HGulpkQcTljJKEcZzUDiDI-8qkZHKFmg4Qt1Qjs2",
  };
  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={"USD"}
      total={checkoutPrice}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};

const Cart = () => {
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);

  const [btnDisp, setBtnDisp] = useState({
    display: "none",
  });

  const [editBtn, setEditBtn] = useState({
    display: "inline-block",
  });

  let total = 0;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //New Listener Code, Real time as fuck
        firebase
          .firestore()
          .collection("users")
          .doc(user.email)
          .collection("cart")
          .onSnapshot((snapshot) => {
            setCartItems([]);
            snapshot.forEach((doc) => {
              const cartItemObj = {
                name: doc.data().name,
                price: doc.data().price,
                quantity: doc.data().quantity,
                image: doc.data().image,
                itemId: doc.data().itemId,
                sellerEmail: doc.data().sellerEmail,
              };
              setCartItems((cartItems) => [...cartItems, cartItemObj]);
            });
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
      .collection("users")
      .doc(localStorage.getItem("email"))
      .collection("cart")
      .where("itemId", "==", item.itemId)
      .get()
      .then((snapshot) => {
        const itemObj = {
          name: snapshot.docs[0].data().name,
          image: snapshot.docs[0].data().image,
          itemId: snapshot.docs[0].data().itemId,
          price: snapshot.docs[0].data().price,
          sellerEmail: snapshot.docs[0].data().sellerEmail,
          quantity: Number(item.quantity),
        };
        firebase
          .firestore()
          .collection("users")
          .doc(localStorage.getItem("email"))
          .collection("cart")
          .doc(snapshot.docs[0].id)
          .update(itemObj)
          .then(() => {
            console.log("done");
          });
      });
  };

  const removeItem = (event, item) => {
    firebase
      .firestore()
      .collection("users")
      .doc(localStorage.getItem("email"))
      .collection("cart")
      .where("itemId", "==", item.itemId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .then(() => {
        console.log("Done");
      });
  };

  return (
    <div className={styles.Cart}>
      <Navbar />
      <div className={styles.itemContainer}>
        <h1 className={styles.title}>shopping bag</h1>
        <div className={styles.container}>
          {cartItems.length !== 0 ? (
            cartItems.map((item, index) => {
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
                        style={btnDisp}
                        onClick={() => {
                          let newItems = [...cartItems];
                          item.quantity = Number(item.quantity) + 1;
                          newItems[index] = item;
                          setCartItems(newItems);
                        }}
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        className={styles.qtyBtns}
                        onClick={() => {
                          setBtnDisp(editBtn);
                          setEditBtn(btnDisp);
                        }}
                        style={editBtn}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.qtyBtns}
                        style={btnDisp}
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
                        style={btnDisp}
                        onClick={(event) => {
                          handleQtyChange(event, item);
                          setEditBtn(btnDisp);
                          setBtnDisp(editBtn);
                        }}
                      >
                        Confirm Changes?
                      </button>
                    </span>
                  </h3>
                  <h3 className={styles.total}>
                    $
                    {`
                  ${Number(item.price) * Number(item.quantity)}`}
                  </h3>
                  <div
                    className={styles.removeItm}
                    onClick={(event) => removeItem(event, item)}
                  >
                    X
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className={styles.emptyCart}>Emtpy cart</h1>
          )}
          <p className={styles.finalPrice}>Total: ${total}</p>
          <div className={styles.paymentBtn}>
            <Payment checkoutPrice={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
