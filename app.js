//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passort-local-mongoose");
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5");
// const bcrypt = require("bcryptjs");
// const saltRounds = bcrypt.genSaltSync(10);

//console.log(process.env.API_KEY);

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

app.use(
  session({
    secret: "Secret here",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);

//const secret = "YOUR SECRET HERE";
// userSchema.plugin(encrypt, {
//   secret: process.env.SECRET,
//   encryptedFields: ["password"],
// });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  // const hash = bcrypt.hashSync(req.body.password, saltRounds);
  // const newUser = new User({
  //   email: req.body.username,
  //   password: hash,
  // });
  // console.log(newUser);
  // newUser.save(function (err) {
  //   if (!err) {
  //     res.render("secrets");
  //   } else {
  //     console.log(err);
  //   }
  // });
});

app.post("/login", function (req, res) {
  // const username = req.body.username;
  //const password = req.body.password;
  ///////bcrypt & salting///////
  //   User.findOne({ email: username }, function (err, foundUser) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       if (foundUser) {
  //         if (bcrypt.compareSync(password, foundUser.password)) {
  //           res.render("secrets");
  //         } else {
  //           console.log("Invalid password");
  //         }
  //       }
  //     }
  //   });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
