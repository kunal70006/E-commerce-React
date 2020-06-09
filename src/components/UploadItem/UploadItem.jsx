import React, { useState } from "react";
import styles from "./UploadItem.module.css";
import { storage } from "../../Firebase";
import firebase from "../../Firebase";
import Navbar from "../Navbar/Navbar";
import TextareaAutosize from "react-textarea-autosize";
//npm install react-textarea-autosize

const UploadItem = () => {
  const [image, setImage] = useState({});

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const selectImage = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
      },
      (error) => {
        //error handler
        alert(error.code + error.message);
      },
      () => {
        //completion function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const itemObj = {
              name: itemName,
              price: itemPrice,
              description: itemDescription,
              imageUrl: url,
              sellerEmail: firebase.auth().currentUser.email,
            };

            firebase.firestore().collection("items").add(itemObj);
          });
      }
    );
  };

  return (
    <div className={styles.uploadItem}>
      <div className={styles.heroImg}>
        <Navbar />
        <div className={styles.uploadItemContainer}>
          <h4>Upload an Item</h4>
          <input
            type="text"
            placeholder="Enter name of item"
            onChange={(event) => {
              setItemName(event.target.value);
            }}
            value={itemName}
          />

          <input
            type="text"
            placeholder="Enter price of the item"
            onChange={(event) => {
              setItemPrice(event.target.value);
            }}
            value={itemPrice}
          />

          <TextareaAutosize
            inputRef={(tag) => {
              this.textarea = tag;
              this.textarea.focus();
            }}
            minRows={2}
            placeholder="Enter description (max 100 chars)"
            maxLength={100}
            className={styles.textFields}
            onChange={(event) => {
              setItemDescription(event.target.value);
            }}
            value={itemDescription}
          />

          <h3>Click the button to upload an image</h3>
          <input
            type="file"
            accept="image/*"
            className={styles.imageSelector}
            onChange={(event) => selectImage(event)}
          />
          <button
            className={styles.submitFormButton}
            onClick={(event) => submitForm(event)}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadItem;
