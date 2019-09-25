import React, { useState, createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = props => {
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errors, setErrors] = useState({});

  const contextValue = {
    username,
    setUsername,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    confirmPass,
    setConfirmPass,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    errors,
    setErrors
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
