var express = require('express');
var userRouter = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require("passport");

const db = require('../../models/index');
const User = db.User

// ? Controller functions
const userController = require('../controllers/index');

userRouter.post("/signup", async (req, res, next) => {

  console.log('************************ REQ: ', req.login)

  console.log("User Sign Up Form data: ", req.body);

  const { email, password } = req.body;

  if (email == "" || password === "") {
    // send JSON file to the frontend if any of these fields are empty or password doesn't contain a number
    res.status(401).json({ message: "All fields need to be filled and password must contain a number! " });
    return;
  }

  try {

    console.log(email)

    const doesUserWithEmailAlready = await User.findOne({
      where: {
        email: email
      }
    });


    console.log('(BACKEND) QUERYING USER DATABASE (SIGNUP) :', doesUserWithEmailAlready)

    // Check if user alrready exists
    if (doesUserWithEmailAlready !== null) {
      res.status(401).json({ message: "A user with the same email is already registered!" });
      return;
    }

  } catch (error) {
    console.log(error)
  }

  // ! Integrate later 
  // ? Encrypt Password
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  let newUser;

  try {

    newUser = await User.create({
      // userName: req.body.userName,
      email: req.body.email,
      password: encryptedPassword
    });


    req.login(newUser, (err) => {
      
      if (err) {
        console.log(err)
        res.status(401).json({ message: "Something happened when logging in after the signup" });
        return;
      }

      newUser.encryptedPassword = undefined;

      // console.log('LOGGE')
      res.status(200).json({ newUser });
    })

  } catch (error) {
    console.log(error)
  }

});

/* GET users listing. */
userRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


userRouter.delete('/:idOfUserToDelete', userController.deleteUserFromDB);

// userRouter.post('/signup', userController.addUserToDB);



userRouter.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // If authentication succeeds, the next handler will be invoked 
    // and the req.user property will be set to the authenticated user.

    console.log('PASSSPORT REQ AUTHETICATE: ', req.user)

    // console.log('&*&*&*&**&*&*&*&&8PASSSPORT RES AUTHETICATE: ', res)

    // set password to undefined so it doesn't get revealed in the client side (browser ==> react app)
    // userDoc.encryptedPassword = undefined;

    // send json object with user information to the client
    res.status(200).json({ LoggedInUser: req.user });

  });

module.exports = userRouter;
