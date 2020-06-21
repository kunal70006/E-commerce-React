import React, { useState, useEffect } from "react";
import firebase from "firebase";
// import { storage } from 'firebase'
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

  return (
    <div>
      <h3> {currentItem.name} </h3>
      <h3> {currentItem.price} </h3>
      <h3> {currentItem.description} </h3>
      <img src={currentItem.imageUrl} alt={currentItem.name} />
    </div>
  );
};

export default Edit;
