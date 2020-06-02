import React, { useState } from "react";
import firebase from "../../Firebase";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerButtonDidClick = (event) => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  return (
    <div>
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
      <input
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />

      <label className={styles.passwordChecker}>
        {password === confirmPassword ? "" : "Passwords do not match"}
      </label>

      <div className={styles.registerButton} onClick={registerButtonDidClick}>
        Register
      </div>
    </div>
  );
};

export default Login;