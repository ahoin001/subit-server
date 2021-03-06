const express = require('express');
const subtitleRouter = express.Router();

// Sequelize Model (Must be Imported this way)
const db = require('../../models/index');
const Project = db.Project
const Subtitle = db.Subtitle

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/



/*******************************************************
 * 
 *                   POST ROUTES
 * 
 * *****************************************************/

subtitleRouter.post('/api/:projectId/add-sub', (req, res, next) => {

    console.log("ADDING SUBTITLE <<<<<<<<<<<<<< ");

    console.log(req.body)

    console.log("USER ADDING SUB: ", req.user)

    const { projectId = req.params.projectId, inTime, outTime, text, inTimeVTT, outTimeVTT } = req.body;

    Subtitle.create({
        projectId,
        inTime,
        outTime,
        text,
        inTimeVTT,
        outTimeVTT
    })
        .then((response) => {
            console.log('CREATED SUBTITLE RESPONSE: ', response)
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err)
        })

});

/*******************************************************
 * 
 *                   DELETE ROUTES
 * 
 * *****************************************************/

subtitleRouter.delete('/api/:subId/delete-sub', async (req, res, next) => {
    // let subID = req.params.subId;
    // let subIDObject = mongoose.mongo.ObjectID(subID);
    // let projectId = '';

    try {

        let response = await Subtitle.destroy({
            where: {
                id: req.params.subId
            }
        })

        console.log('RESPONSE AFTER DELETEING ************************* : ', response)
        res.status(200).json({ message: 'Subtitle deleted: ' });

    } catch (error) {
        console.log(error)
    }

});

/*******************************************************
 * 
 *                   PUT ROUTES
 * 
 * *****************************************************/

subtitleRouter.put('/api/:subId/edit-sub', async (req, res, next) => {
    console.log("UPDATE WAS CALLED <<<<<<<<<<<<<<<<<")
    console.log(req.body)
    let subID = req.params.subId;
    const { inTime, outTime, text, inTimeVTT, outTimeVTT } = req.body;

    const response = await Subtitle.update({
        text,
        inTime,
        outTime,
        inTimeVTT,
        outTimeVTT
    }, {
        where: {
            id: subID
        }
    })

    res.status(200).json({ message: 'You updated this sub', response });

});




module.exports = subtitleRouter;