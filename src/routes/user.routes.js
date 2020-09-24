var express = require('express');
var router = express.Router();

const passport = require("passport");
const bcrypt = require('bcrypt');

const db = require('../../models/index');
const User = db.User

// ? Controller functions
const userController = require('../controllers/index')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.delete('/:idOfUserToDelete', userController.deleteUserFromDB);


// ! READ ME WHEN YOU WORK AGAIAN
// ? YOU NEED TO CHECK CONTROLLER AND FIGURE OUT HOW TO USE SEQUEIZE MODEL WITH PASSPORT

// router.post('/signup', userController.addUserToDB);

router.post("/signup", async (req, res, next) => {

  console.log('************************ REQ: ', req.login)

  console.log("User Sign Up Form data: ", req.body);

  const { userName, email, password } = req.body;

  if (userName == "" || email == "" || password.match(/[0-9]/) === null) {
    // send JSON file to the frontend if any of these fields are empty or password doesn't contain a number
    res.status(401).json({ message: "All fields need to be filled and password must contain a number! " });
    return;
  }

  try {

    console.log(email)
    const userWithEmailAlready = await User.findOne({
      where: {
        email: email
      }
    });


    console.log('(BACKEND) QUERYING USER DATABASE (SIGNUP) :', userWithEmailAlready)

    // Check if user alrready exists
    if (userWithEmailAlready !== null) {
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
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
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

router.post('/login',
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
    res.status(200).json({LoggedInUser: req.user });

  });

// router.post("/login", (req, res, next) => {
// 

// ***************************************************************

// try {

//   const userSigningIn = await User.findAll({
//     where: {
//       email: email
//     }
//   });

//   console.log('(BACKEND) QUERYING USER DATABASE (SignUp) :', cats)

//   return res.json({
//     userSigningIn
//   })

// } catch (error) {
//   console.log(error)
// }

// ***************************************************************

//   console.log(req)
//   console.log('ENTERED LOGIN ROUTE')
//   passport.authenticate("local", (err, userDoc, failureDetails) => {
//     if (err) {
//       res.status(500).json({ message: "Something went wrong with login." })
//     }
//     if (!userDoc) {
//       res.status(401).json(failureDetails);
//     }

//     req.login(userDoc, (err) => {
//       if (err) {
//         res.status(500).json({ message: "Something went wrong with getting user object from DB" })
//         return;
//       }
//       // set password to undefined so it doesn't get revealed in the client side (browser ==> react app)
//       userDoc.encryptedPassword = undefined;
//       // send json object with user information to the client
//       res.status(200).json({ userDoc });
//     })
//   })(req, res, next);

//   console.log('LOGGED IN')
// }

// )

module.exports = router;
