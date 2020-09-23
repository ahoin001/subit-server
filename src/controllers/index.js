// ? MODELS MUST BE IMPORTED THIS WAY IN THIS VERSION OF SEQUELIZE CLI
const db = require('../../models/index');
const User = db.User

const addUserToDB = async (req, res) => {

    console.log('IN ADDUSERDB CONTROLLER')
    console.log(req.body)

    try {

        const newUser = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            newUser,
        });

    } catch (error) {
        console.log(error)
    }

}

const getUsersFromDB = async (req, res) => {

    try {
        const users = await User.findAll();

        // console.log('(BACKEND) QUERYING CAT DATABASE :', cats)

        return res.json({
            users
        })

    } catch (error) {
        console.log(error)
    }

}

// const getlovedCatsFromDB = async (req, res) => {

//     try {
//         const lovedCats = await Cat.findAll({
//             where: {
//                 loved: true
//             }
//         });

//         return res.json({
//             lovedCats
//         })

//     } catch (error) {
//         console.log(error)
//     }

// }

// const updateCatLovedInDB = async (req, res) => {

//     console.log(req.body)

//     // ? Use catid from http request url
//     const { idOfCatToLove, loved } = req.body

//     try {

//         await Cat.update({ loved: loved }, {
//             where: {
//                 catId: idOfCatToLove
//             }
//         });

//         return res.json({
//             message: 'UPDATED CAT TO LOVED SUCCESSFULLY!'
//         })

//     } catch (error) {
//         console.log(error)
//     }


// }

const deleteUserFromDB = async (req, res) => {

    console.log(`$$$$$ req `,req.params.idOfUserToDelete)
    // ? Use catid from http request url
    const { idOfUserToDelete } = req.params
    console.log(`$$$$$ req `,idOfUserToDelete)
    
    try {

        await User.destroy({
            where: {
                id: idOfUserToDelete
            }
        });

        return res.json({
            message: 'Deleted User successfully!'
        })

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    addUserToDB,
    getUsersFromDB,
    deleteUserFromDB,
    // getlovedCatsFromDB,
    // updateCatLovedInDB
}