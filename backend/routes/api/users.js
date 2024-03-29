const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../../models/user");

//Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route POST api/users/register
//@desc Register the user
//@access Public
router.post("/register", (req, res) => {
  console.log("innit");
  //We know that the function will return errors and isValid, we can use ES6 destructuring.
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Check if user already exists, if not add the user.
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists." });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      //Hash the password and save the user
      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST api/users/login
//@desc Logs in the user and returns JWT
//@access Public

router.post("/login", (req, res) => {
  console.log("innit");
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email.
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email doesn't exist." });
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Input is valid, create JWT payload.
        const payload = {
          id: user.id,
          name: user.name
        };

        //Sign the token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 31556926 }, //1 year
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        //Not a match
        return res.status(400).json({ passwordIncorrect: "Wrong password." });
      }
    });
  });
});

module.exports = router;
