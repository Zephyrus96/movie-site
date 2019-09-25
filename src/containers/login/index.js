import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { AuthContext } from "../../context/AuthContext";
import { registerUser } from "../../actions/authActions";
import "./style.css";

const LoginPage = props => {
  //Refs
  const container = useRef(null);

  //Context
  const contextValue = useContext(AuthContext);
  // const state = useContext(StateContext);
  // const dispatch = useContext(DispatchContext);

  //Event handlers
  const changeToActive = target => {
    if (target === "signUp") {
      container.current.classList.add("rightPanelActive");
    } else if (target === "signIn") {
      container.current.classList.remove("rightPanelActive");
    }
  };

  const onChange = (input, e) => {
    switch (input) {
      case "username":
        contextValue.setUsername(e.target.value);
        break;
      case "registerEmail":
        contextValue.setRegisterEmail(e.target.value);
        break;
      case "registerPassword":
        contextValue.setRegisterPassword(e.target.value);
        break;
      case "confirmPassword":
        contextValue.setConfirmPass(e.target.value);
        break;
      case "loginEmail":
        contextValue.setLoginEmail(e.target.value);
        break;
      case "loginPassword":
        contextValue.setLoginPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onRegisterSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: contextValue.username,
      email: contextValue.registerEmail,
      password: contextValue.registerPassword,
      confirmPass: contextValue.confirmPass
    };
    // contextValue.setUsername("");
    // contextValue.setRegisterEmail("");
    // contextValue.setRegisterPassword("");
    // contextValue.setConfirmPass("");
    registerUser(newUser);
  
  };

  const onLoginSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: contextValue.loginEmail,
      password: contextValue.loginPassword
    };
    // contextValue.setLoginEmail("");
    // contextValue.setLoginPassword("");
    console.log(newUser);
  };

  return (
    <div ref={container} className={styles.container}>
      <div className={`formContainer signUpContainer`}>
        <form noValidate className={styles.form} onSubmit={onRegisterSubmit}>
          <h1>Create Account</h1>
          <span className={styles.error}>{contextValue.errors.username}</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            onChange={onChange.bind(this, "username")}
            value={contextValue.username}
            error={contextValue.errors.username}
          />
          <span className={styles.error}>{contextValue.errors.email}</span>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={onChange.bind(this, "registerEmail")}
            value={contextValue.registerEmail}
            error={contextValue.errors.email}
          />
          <span className={styles.error}>{contextValue.errors.password}</span>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={onChange.bind(this, "registerPassword")}
            value={contextValue.registerPassword}
            error={contextValue.errors.password}
          />
          <span className={styles.error}>
            {contextValue.errors.confirmPass}
          </span>
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            onChange={onChange.bind(this, "confirmPassword")}
            value={contextValue.confirmPass}
            error={contextValue.errors.confirmPass}
          />
          <button className={styles.button}>SIGN UP</button>
        </form>
      </div>
      <div className={`formContainer signInContainer`}>
        <form noValidate className={styles.form} onSubmit={onLoginSubmit}>
          <h1>Sign in</h1>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={onChange.bind(this, "loginEmail")}
            value={contextValue.loginEmail}
            error={contextValue.errors.email}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={onChange.bind(this, "loginPassword")}
            value={contextValue.loginPassword}
            error={contextValue.errors.password}
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
