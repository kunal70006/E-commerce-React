import React, { useState } from "react";
import firebase from "../../Firebase";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerButtonDidClick = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  return (
    <div className={styles.Login}>
      <div className={styles.heroImg}>
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

          <button
            className={styles.loginButton}
            onClick={registerButtonDidClick}
          >
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
