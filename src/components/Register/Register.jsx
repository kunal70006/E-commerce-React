import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Firebase";
import styles from "./Register.module.css";
import Navbar from "../Navbar/Navbar";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const registerButtonDidClick = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("email", user.user.email);
        localStorage.setItem("uid", user.user.uid);
        history.push("/");
      })
      .catch((error) => {
        alert(error.code, error.message);
      });
  };

  return (
    <div className={styles.Register}>
      <div className={styles.heroImg}>
        <Navbar />
        <div className={styles.registerContainer}>
          <h4>Register</h4>
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

          <button
            className={styles.registerButton}
            onClick={registerButtonDidClick}
          >
            Register
          </button>

          <div className={styles.loginHref}>
            Already have an account?
            <a href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
