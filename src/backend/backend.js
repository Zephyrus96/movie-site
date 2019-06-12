const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//Database Config

const db = require("../resources/mongo").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("../resources/passport")(passport);

// Use Routes
app.use("/api/users", users);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Welcome to the API"
//   });
// });

// app.post("/api/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created.",
//         authData
//       });
//     }
//   });
// });

// app.post("/api/login", (req, res) => {
//   const user = {
//     id: 1,
//     username: "johndoe",
//     email: "test@gmail.com"
//   };
//   jwt.sign({ user }, "secretkey", (err, token) => {
//     res.json({
//       token
//     });
//   });
// });

// function verifyToken(req, res, next) {
//   //Get auth header value
//   //Format of Token:
//   //Authorization: Bearer <access_token>
//   const bearerHeader = req.headers.authorization;
//   //Check if bearer is undefined
//   if (typeof bearerHeader != undefined) {
//     const bearer = bearerHeader.split(" ");
//     req.token = bearer[1];
//     next();
//   } else {
//     //Forbidden
//     res.sendStatus(403);
//   }
// }
