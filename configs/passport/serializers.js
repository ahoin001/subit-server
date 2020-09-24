const passport = require("passport");

const db = require('../../models/index');
const User = db.User

// defines which data are going to be saved in the session
// happens when user log in successfully
passport.serializeUser((loggedInUser, done) => {
  // serialize user === save user id to the session
  console.log('SERIALIZER LOGGEDINUSERID', loggedInUser)
  done(null, loggedInUser.dataValues.id)
});

// helps us to retrieve user information from the database
// happens AUTOMATICALLY on every request after you login
// whenever you refresh the page or any change happens that would normally log you out,
// .deserializeUser() keeps you in and you don't have to log in
passport.deserializeUser(async (userIdFromSession, done) => {

  User.findOne({ where: { id: userIdFromSession } })
    .then(fullUserDoc => done(null, fullUserDoc))
    .catch(err => done(err))

  // ********** OLD
  // deserialize user => retrieve user information from database
  // User.findById(userIdFromSession)
  //   .then(fullUserDoc => done(null, fullUserDoc))
  //   .catch(err => done(err))

});

// ahoin001@gmail.com
// Alex9595