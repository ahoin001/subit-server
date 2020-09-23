const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

var storage = cloudinaryStorage({
  cloudinary,
  params : {resource_type: 'video'},
  allowedFormats: ['mp4'],
  filename: function (req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploader = multer({ storage });
module.exports = uploader;


// // CLOUDINARY SET UP
// /****************************************************************/
// const cloudinary = require('cloudinary').v2;

// // var multer = require('multer');
// // var storage = multer.diskStorage({
// //   filename: function (req, file, callback) {
// //     callback(null, Date.now() + file.originalname);
// //   }
// // });

// // var upload = multer({ storage: storage })

// cloudinary.config({
//   cloud_name: 'damclaohv',                            // TODO USE ENV FOR SECURITY AFTER MAKING SURE IT ALL WORKS
//   api_key: 357812489313368,                           // process.env.CLOUDINARY_API_KEY, 
//   api_secret: 'BN_PH_5aGxM9bI-eMB9HXHIxR10'             // process.env.CLOUDINARY_API_SECRET
// });

// module.exports = cloudinary;
