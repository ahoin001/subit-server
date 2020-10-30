const express = require('express');
const projectRouter = express.Router();

// Sequelize Model (Must be Imported this way)
const db = require('../../models/index');
const Project = db.Project

// for multipart/formdata
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// Import CLoudinary from config files where we set access keys
const cloudinary = require('../../configs/cloudinary-config')

/*******************************************************
 * 
 *                   CREATE ROUTE
 * 
 * *****************************************************/

projectRouter.post('/api/create-project/:userId', upload.single('videoFile'), async (req, res, next) => {

  // console.log('*************************************************** userId: ', req.params.userId);
  console.log('*************************************************** reqbody: ', req.body)
  console.log('*************************************************** reqfile: ', req.file)

  try {

    // * Upload Video file to cloudinary and save Url to database

    const uploadResponseFromCloudinary = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'subit',
      resource_type: "video"
    });

    console.log('RESPONSE FROM CLOUDINARY UPLOAD, NEED PUBLIC ID: ', uploadResponseFromCloudinary.public_id)

    // * Videoes would be too large, so I saved the vidoe to cloudinary, and then video url to video in DB 

    const videoURL = uploadResponseFromCloudinary.url;

    const userId = req.params.userId;

    const { title, genre, description, language } = req.body;

    const responseFromCreatingProject = await Project.create({
      userId,
      videoURL,
      title,
      genre,
      description,
      language,
    });

    console.log('!!!!!!!!!!!!!!!!!! RESPONSE FROM PROJECT CREATE: ', responseFromCreatingProject)

    res.status(200).json(responseFromCreatingProject);

  } catch (error) {
    console.log('FAILIURE')
    console.log(error)
  }

})

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/

projectRouter.get('/api/dashboard/:userId', (req, res, next) => {

  // Finding all  projects with the userId matching the current user _id
  Project

    // Return all documents with the current userID
    .findAll({
      where: {
        userId: req.params.userId
      }
    })
    .then((projects) => {

      // Make sure we have projects
      console.log("this is working !!!!!!!!!!! ", projects)

      console.log("USER REQUESTING PROJECTS: ", req.user)

      // res.render('index');
      res.status(200).json(projects);

    }).catch(err => res.status(402).json(err))

});

projectRouter.get('/api/subtitles/:projectId', async (req, res, next) => {

  console.log("YOU MADE IT!!!!!!!!! Project Id", req.params.projectId);
  // `SELECT * FROM "Projects" JOIN "Subtitles" ON "Subtitles"."projectId" = "Projects".id;`);
  try {

    const [results, metadata] = await db.sequelize.query(
      // `SELECT * FROM "Projects" JOIN "Subtitles" ON "Subtitles"."projectId" = ${req.params.projectId};`);
      `SELECT * FROM "Subtitles" WHERE "Subtitles"."projectId" = ${req.params.projectId};`);
    console.log('!!!!!!!!!!!!!!!!!!!!: ,', results);

    results.map((eachSub) => {
      console.log(eachSub.inTimeVTT);
      console.log(eachSub.outTimeVTT);
      console.log(eachSub.text)
    });

    res.status(200).json({ results });

  } catch (error) {
    console.log(error)
  }


  // Project
  //   .findById(req.params.projectId)
  //   .populate('subtitleArray')
  //   .then(project => {
  //     let subArray = project.subtitleArray;
  //     subArray.map((eachSub) => {
  //       console.log(eachSub.inTimeVTT);
  //       console.log(eachSub.outTimeVTT);
  //       console.log(eachSub.text)
  //     });

  //     res.status(200).json({ subArray });
  //   })
  //   .catch(err => next(err));

});

projectRouter.get('/api/project-info/:projectId', async (req, res, nex) => {

  let projectId = req.params.projectId;

  try {

    const foundProjec = await Project.findOne({
      where: {
        email: email
      }
    });

    res.status(200).json(foundProjec);

  } catch (error) {
    console.log('FAILED FINDING SPECIFIC PROJECT');
    console.log(error)
  }

});

/********************************************************** 
  
 * UPDATE AND DELETE
 
***********************************************************/

// UPDATE ROUTE
projectRouter.put("/api/project/:id/updateProject", (req, res) => {

  // Find Project in DB using current user ID , and update the username to what is in the form
  Project
    .findByIdAndUpdate(req.params.id, { title: req.body.title, genre: req.body.genre, description: req.body.description, language: req.body.language }, { new: true })
    .then((project) => {
      console.log('========================================================================================================================================')
      console.log(project);
      console.log('========================================================================================================================================')
      res.json(project)
    })
    .catch((err) => {
      console.log(`Error updating document`, err);
    })

});

// DELETE ROUTE
projectRouter.delete('/api/deleteProject/:projectId', async (req, res, next) => {

  console.log(req.params.id);
  console.log('PROJECT BEING DELETED');
  console.log('=====================================================');

  try {

    let response = await Project.destroy({
      where: {
        id: req.params.projectId
      }
    })

    console.log('RESPONSE AFTER DELETEING ************************* : ', response)
    res.status(200).json({ message: 'Project deleted: ' });

  } catch (error) {
    console.log(error)
  }

})

module.exports = projectRouter;