import React, { useState, useEffect } from "react";
import firebase from "firebase";
// import { storage } from 'firebase'
import Navbar from "../Navbar/Navbar";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./Edit.module.css";

const Edit = () => {
  // const history = useHistory()
  const location = useLocation();

  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [isDisabled, setDisabled] = useState(false);

  const [tempItems, setTempItems] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (typeof location.itemId === "undefined") {
      let id = sessionStorage.getItem("haxx");

      firebase
        .firestore()
        .collection("items")
        .doc(id)
        .get()
        .then((snapshot) => {
          setCurrentItem(snapshot.data());
        });
    } else {
      sessionStorage.setItem("haxx", location.id);

      firebase
        .firestore()
        .collection("items")
        .doc(location.itemId)
        .get()
        .then((snapshot) => {
          setCurrentItem(snapshot.data());
        });
    }
  }, []);

  const handleTextFieldChange = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      //Database Stuff here
      //TODO add option to edit image too
      console.log(tempItems);
    }
  };

  {
    /*return (
    <div className={styles.Edit}>
      <h3> {currentItem.name} </h3>
      <h3> {currentItem.price} </h3>
      <h3> {currentItem.description} </h3>
      <img src={currentItem.imageUrl} alt={currentItem.name} />
  </div>);*/
  }
  return (
    <div className={styles.Edit}>
      <Navbar />
      <div className={styles.editContainer}>
        <h1 className={styles.title}>Edit Item</h1>

        <div className={styles.itemDiv}>
          <input
            type="text"
            disabled={isDisabled}
            placeholder={"Placeholder name"}
            className={styles.textField}
            onChange={(e) => {
              setTempItems({ name: e.target.value });
            }}
            value={tempItems.name}
            onKeyPress={handleTextFieldChange}
          />
          <button
            className={styles.editBtn}
            onClick={() => setDisabled(!isDisabled)}
          >
            <i className="far fa-edit"></i>
          </button>
        </div>

        <div className={styles.itemDiv}>
          <input
            type="text"
            disabled={isDisabled}
            placeholder={"Placeholder price"}
            className={styles.textField}
            onChange={(e) => {
              setTempItems({ price: e.target.value });
            }}
            value={tempItems.price}
            onKeyPress={handleTextFieldChange}
          />
          <button
            className={styles.editBtn}
            onClick={() => setDisabled(!isDisabled)}
          >
            <i className="far fa-edit"></i>
          </button>
        </div>

        <div className={styles.itemDiv}>
          <input
            type="text"
            disabled={isDisabled}
            placeholder={"Placeholder desc"}
            className={styles.textField}
            onChange={(e) => {
              setTempItems({ description: e.target.value });
            }}
            value={tempItems.description}
            onKeyPress={handleTextFieldChange}
          />
          <button
            className={styles.editBtn}
            onClick={() => setDisabled(!isDisabled)}
          >
            <i className="far fa-edit"></i>
          </button>
        </div>
        <img src={require("./meme.jpg")} className={styles.img} alt="name" />
      </div>
    </div>
  );
};

export default Edit;
