import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "../../Firebase";

import styles from "./Profile.module.css";

const Profile = () => {
  const history = useHistory();

  const [isUser, setUser] = useState({
    name: "",
    email: "",
    uid: "",
  });

  useEffect(() => {
    const getUser = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          setUser({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          });
        } else {
          alert("You need to log in to see your profile")
          history.push("/login")
        }
      });
    };

    getUser();
  }, []);

  return (
    <div className={styles.Profile}>
      <Navbar />
      <div className={styles.profileContainer}>
        <h1 className={styles.title}>Profile</h1>

        <div className={styles.userDetails}>
          <h1 className={styles.name}>Name: {isUser.name}</h1>
          <h1 className={styles.email}>Email: {isUser.email}</h1>
          <button
            className={styles.adminBtns}
            onClick={() => history.push("/uploadItem")}
          >
            Upload Items
          </button>
          <button
            className={styles.adminBtns}
            onClick={() => history.push("/promgmnt")}
          >
            Manage Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
