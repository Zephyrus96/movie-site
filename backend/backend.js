const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Origin, Authorization, Accept, Cookie"
    );
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

mongoose
  .connect( `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-izeqa.mongodb.net/${
    process.env.MONGO_DB
  }?retryWrites=true&w=majority`,  { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err => console.log(err));


// Use Routes
app.use("/api/users", users);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
