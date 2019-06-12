const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInputs(data) {
  let errors = {};

  //Convert empty fields to an empty string for validation
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPass = !isEmpty(data.confirmPass) ? data.confirmPass : "";

  //Input validation
  if (Validator.isEmpty(data.username)) {
    errors.username = "Please enter a username.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Please enter your email.";
  } else if (!Validator.isEmail) {
    errors.email = "Please enter a valid email.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter a password.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (Validator.isEmpty(data.confirmPass)) {
    errors.confirmPass = "Please confirm your password.";
  }
  if (!Validator.equals(data.password, data.confirmPass)) {
    errors.confirmPass = "Your passwords don't match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
