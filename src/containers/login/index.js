import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import "./style.css";

const LoginPage = props => {
  const container = useRef(null);

  const changeToActive = target => {
    if (target === "signUp") {
      container.current.classList.add("rightPanelActive");
    } else if (target === "signIn") {
      container.current.classList.remove("rightPanelActive");
    }
  };

  return (
    <div ref={container} className={styles.container}>
      <div className={`formContainer signUpContainer`}>
        <form className={styles.form} action="#">
          <h1>Create Account</h1>
          <input className={styles.input} type="text" placeholder="Username" />
          <input className={styles.input} type="email" placeholder="Email" />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
          />
          <button className={styles.button}>SIGN UP</button>
        </form>
      </div>
      <div className={`formContainer signInContainer`}>
        <form className={styles.form} action="#">
          <h1>Sign in</h1>
          <input className={styles.input} type="email" placeholder="Email" />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <div className={styles.forgotPass}>
            <Link to="#">Forgot your password?</Link>
          </div>
          <button className={styles.button}>SIGN IN</button>
        </form>
      </div>
      <div className="overlayContainer">
        <div className="overlay">
          <div className={`overlayPanel overlayLeft`}>
            <h1>Welcome Back!</h1>
            <p>To connect please login using your account credentials.</p>
            <button
              onClick={changeToActive.bind(this, "signIn")}
              className={styles.button}
            >
              Sign In
            </button>
          </div>
          <div className={`overlayPanel overlayRight`}>
            <h1>Hello Guest!</h1>
            <p>
              To explore every feature we have, create an account and fill your
              personal info.
            </p>
            <button
              onClick={changeToActive.bind(this, "signUp")}
              className={styles.button}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
