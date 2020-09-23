var express = require('express');
var router = express.Router();

// ? Controller functions
const userController = require('../controllers/index')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.delete('/:idOfUserToDelete', userController.deleteUserFromDB);

router.post('/signup', userController.addUserToDB);

// router.post("/signup", (req, res, next) => {

//   console.log("frontend form data: ", req.body);

//   const { userName, email, password } = req.body;

//   if (userName == "" || email == "" || password.match(/[0-9]/) === null) {
//     // send JSON file to the frontend if any of these fields are empty or password doesn't contain a number
//     res.status(401).json({ message: "All fields need to be filled and password must contain a number! " });
//     return;
//   }

//   User
//     .findOne({ email })
//     .then(foundUser => {

//       if (foundUser !== null) {
//         res.status(401).json({ message: "A user with the same email is already registered!" });
//         return;
//       }

//       const bcryptSalt = 10;
//       const salt = bcrypt.genSaltSync(bcryptSalt);
//       const encryptedPassword = bcrypt.hashSync(password, salt);

//       User
//         .create({ userName, email, encryptedPassword })
//         .then(userDoc => {
//           // if all good, log in the user automatically
//           // "req.login()" is a Passport method that calls "serializeUser()"
//           // (that saves the USER ID in the session)

//           req.login(userDoc, (err) => {
//             if (err) {
//               res.status(401).json({ message: "Something happened when logging in after the signup" });
//               return;
//             }
//             userDoc.encryptedPassword = undefined;
//             res.status(200).json({ userDoc });
//           })
//         })
//         .catch(err => next(err));
//     })
//     .catch(err => next(err));
// });

// router.post("/login", (req, res, next) => {
//   // 
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
