const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../models/User");
// const subUser = require('../../models/')

const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
  usernameField: "email"
}, async (email, password, next) => {

  // ? Worked for mongoose
  User.findOne({ email })
  .then( foundUser => {
    if(!foundUser){
      return next(null, false, { message: "Incorrect email 🖥" })
    }
    if(!bcrypt.compareSync(password, foundUser.encryptedPassword)){
      return next(null, false, { message: "Incorrect password 🥺" })
    }
    return next(null, foundUser, { message: "Logged in successfully 🎯" });
  } )
  .catch(err => next(err));

  // try {
  //   // For Sequelize
  //  const response= await User.findAll({
  //     where: {
  //       email: email
  //     }
  //   });

  //   console.log('%%%%%%%%%%%%%%%%%%%%%%%%% QUERY ANSWER: ',response)

  // } catch (error) {

  // }




}

))
