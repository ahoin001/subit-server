const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require('../../models/index')
const User = db.User

const bcrypt = require('bcrypt');

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

      // console.log('#%^&$&*^*%*$(%$&*%^(%( IN PASSPORT LOCAL STRAT: ', foundUser)
      // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ UserValue: ', foundUser.dataValues.password)

      if (!foundUser) {
        console.log("EMAIL NOT FOUND$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        return done(null, false, { message: 'Incorrect email.' });
        // res.send({ message: 'Incorrect email.' });
      }

      if (!bcrypt.compareSync(password, foundUser.dataValues.password)) {
        return done(null, false, { message: "Incorrect password 🥺" })
      }

      return done(null, foundUser);

    }
    catch (error) {

      console.log(error)

    }

  }

));