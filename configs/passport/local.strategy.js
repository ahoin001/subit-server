const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// mongoose
// const User = require("../../models/User");

const db = require('../../models/index')
const User = db.User

const bcrypt = require('bcrypt');

// passport.use(new LocalStrategy({
//   usernameField: "email"
// }, async (email, password, next) => {

//   // ? Worked for mongoose
//   // User.findOne({ email })
//   // .then( foundUser => {
//   //   if(!foundUser){
//   //     return next(null, false, { message: "Incorrect email 🖥" })
//   //   }
//   //   if(!bcrypt.compareSync(password, foundUser.encryptedPassword)){
//   //     return next(null, false, { message: "Incorrect password 🥺" })
//   //   }
//   //   return next(null, foundUser, { message: "Logged in successfully 🎯" });
//   // } )
//   // .catch(err => next(err));

//   try {
//     // For Sequelize
//     const foundUser = await User.findAll({
//       where: {
//         email: email
//       }
//     });

//     console.log('FOUND USERRRR : ',foundUser)

//     if (!foundUser) {
//       return next(null, false, { message: "Incorrect email 🖥" })
//     }

//     //   if(!bcrypt.compareSync(password, foundUser.encryptedPassword)){
//     //   return next(null, false, { message: "Incorrect password 🥺" })
//     // }

//     return next(null, foundUser, { message: "Logged in successfully 🎯" });

//     // Passport Doc says use this
//     // return done(null, user);

//   } catch (error) {
//     console.log(error)
//   }

// }

// ))


// ***************************** SEQUELIZE
passport.use(new LocalStrategy({
  usernameField: 'email',
},
  async function (email, password, done) {

    try {

      const foundUser = await User.findOne({
        where: {
          email: email
        }
      });

      console.log('#%^&$&*^*%*$(%$&*%^(%( IN PASSPORT LOCAL STRAT: ', foundUser)
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ UserValue: ',foundUser.dataValues)

      return done(null, foundUser);

    }
    catch (error) {

      if (err) { return done(err); }
      if (!foundUser) {
        return done(null, false, { message: 'Incorrect email.' });
      }

    }

    // const foundUser = await User.findOne({
    //   where: {
    //     email: email
    //   }
    // });

    // if (err) { return done(err); }
    // if (!foundUser) {
    //   return done(null, false, { message: 'Incorrect email.' });
    // }
    // if (!foundUser.validPassword(password)) {
    //   return done(null, false, { message: 'Incorrect password.' });
    // }

    // ? If found with no issue
    return done(null, foundUser);

    // User.findOne({ email: email }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });

  }
));