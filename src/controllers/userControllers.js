const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../../models/index');
const User = db.User

const SignUp = async (req, res, next) => {

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
    let token;

    try {

        newUser = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });

        try {

            token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                'super-secret-jwt',
                { expiresIn: '1h' }
            )
        } catch (error) {
            console.log(error)
        }

        res.status(200).json({ newUser: newUser, token: token });

        // req.login(newUser, (err) => {
        //     if (err) {
        //         console.log(err)
        //         res.status(401).json({ message: "Something happened when logging in after the signup" });
        //         return;
        //     }

        //     newUser.encryptedPassword = undefined;

        //     // console.log('LOGGE')
        //     res.status(200).json({ newUser });
        // })

    } catch (error) {
        console.log(error)
    }

};


const Login = async (req, res, next) => {

    const { email, password } = req.body;

    // First fin any user witht the email
    let exsistingUser;

    try {

        // Check if a user exsists with this email
        exsistingUser = await User.findOne({
            where: {
                email: email
            }
        });

    } catch (err) {
        console.log(err)
    }

    if (!exsistingUser) {
        // return next(new HttpError('Login failed,invalid email ', 403))
    }

    // let isValidPassword;

    // try {

    //     // Use Bcrypt to compare provided password to encrypted passwords, returns boolean
    //     isValidPassword = await bcrypt.compare(password, exsistingUser.password)

    // } catch (error) {
    //     return next(new HttpError('Login failed, inavalid credentials ', 500))
    // }

    // // TODO Why is this ! here?
    // if (!isValidPassword) {
    //     return next(new HttpError('Login failed, inavalid password ', 403))
    // }

    // * NOTE Creating jsonwebtoken on login
    let token;

    try {

        // Issue maybe here with id (__id if getter didn't set in creating user)
        token = jwt.sign(
            { userId: exsistingUser.id, email: exsistingUser.email },
            'super-secret-jwt', //private key must be same in login at is in sign up
            { expiresIn: '1h' } // third argument is config object with properties we can change values of 
        )
    } catch (error) {
        error = new HttpError('Login failed, please try again.', 500);
        // use next to stop code excecution
        return next(error)
    }

    console.log(`*********************`, token)
    //  console.log(`*********************`,exsistingUser.id)

    res.status(201).json({ userId: exsistingUser.id, email: exsistingUser.email, token: token })


}