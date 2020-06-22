import React, { useState, useEffect } from "react";
import firebase from "firebase";
// import { storage } from 'firebase'
import Navbar from "../Navbar/Navbar";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./Edit.module.css";

const Edit = () => {
  const history = useHistory()
  const location = useLocation();

  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [isNameFieldDisabled, setIsNameFieldDisabled] = useState(true);
  const [isPriceFieldDisabled, setIsPriceFieldDisabled] = useState(true);
  const [isDescFieldDisabled, setIsDescFieldDisabled] = useState(true);

  const [tempItem, setTempItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const getItemDetails = (id) => {
    firebase
      .firestore()
      .collection("items")
      .doc(id)
      .get()
      .then((snapshot) => {
        setCurrentItem(snapshot.data());
        setTempItem(snapshot.data())
      })
  }

  useEffect(() => {
    if (typeof location.itemId === "undefined") {
      let id = sessionStorage.getItem("haxx");
      getItemDetails(id)
    } else {
      sessionStorage.setItem("haxx", location.itemId);
      getItemDetails(location.itemId)
    }
  }, []);

  const handleTextFieldChange = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      //TODO add option to edit image too
      switch(event.target.placeholder) {
        case 'Placeholder name': setIsNameFieldDisabled(!isNameFieldDisabled); break;
        case 'Placeholder price': setIsPriceFieldDisabled(!isPriceFieldDisabled); break;
        case 'Placeholder desc': setIsDescFieldDisabled(!isDescFieldDisabled); break;
      }
    }
  };

  const submitChanges = () => {
    firebase
      .firestore()
      .collection('items')
      .doc(sessionStorage.getItem("haxx"))
      .update(tempItem)
      .then( () => {
        console.log("done")
        alert("Changes have been submitted")
        history.push("/promgmnt")
      })
  }

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
            disabled={isNameFieldDisabled}
            placeholder={"Placeholder name"}
            className={styles.textField}
            // onChange={(e) => {
            //   setTempItems({ name: e.target.value });
            // }}
            onChange={ (event) => {
              setTempItem({
                name: event.target.value,
                price: tempItem.price,
                description: tempItem.description,
                imageUrl: tempItem.imageUrl,
              })
            }}
            value={tempItem.name}
            onKeyPress={handleTextFieldChange}
          />
          <button
            className={styles.editBtn}
            onClick={() => setIsNameFieldDisabled(!isNameFieldDisabled)}
          >
            <i className="far fa-edit"></i>
          </button>
        </div>

        <div className={styles.itemDiv}>
          <input
            type="text"
            disabled={isPriceFieldDisabled}
            placeholder={"Placeholder price"}
            className={styles.textField}
            // onChange={(e) => {
            //   setTempItems({ price: e.target.value });
            // }}
            onChange={ (event) => {
              setTempItem({
                name: tempItem.name,
                price: event.target.value,
                description: tempItem.description,
                imageUrl: tempItem.imageUrl,
              })
            }}
            value={tempItem.price}
            onKeyPress={handleTextFieldChange}
          />
          <button
            className={styles.editBtn}
            onClick={() => setIsPriceFieldDisabled(!isPriceFieldDisabled)}
          >
            <i className="far fa-edit"></i>
          </button>
        </div>

        <div className={styles.itemDiv}>
          <input
            type="text"
            disabled={isDescFieldDisabled}
            placeholder={"Placeholder desc"}
            className={styles.textField}
            // onChange={(e) => {
            //   setTempItems({ description: e.target.value });
            // }}
            onChange={ (event) => {
              setTempItem({
                name: tempItem.name,
                price: tempItem.price,
                description: event.target.value,
                imageUrl: tempItem.imageUrl,
              })
            }}
            value={tempItem.description}
            onKeyPress={handleTextFieldChange}
          />
          <button
            className={styles.editBtn}
            onClick={() => setIsDescFieldDisabled(!isDescFieldDisabled)}
          >
            <i className="far fa-edit"></i>
          </button>
        </div>
        <img src={currentItem.imageUrl} className={styles.img} alt="name" />

        <button onClick={() => submitChanges()}>Submit Changes</button>
      </div>
    </div>
  );
};

export default Edit;
