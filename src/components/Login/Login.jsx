import React, { useState } from "react";
import firebase from "../../Firebase";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginButtonDidClick = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("email", user.user.email);
        localStorage.setItem("uid", user.user.uid);
        history.push("/profile");
      })
      .catch((error) => {
        alert(error.code, error.message);
      });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.heroImg}>
        <Navbar />
        <div className={styles.loginContainer}>
          <h4>Login</h4>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Set your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button className={styles.loginButton} onClick={loginButtonDidClick}>
            Login
          </button>

          <div className={styles.regHref}>
            Don't have an account?
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
