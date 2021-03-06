const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "damclaohv",
    api_key: "357812489313368",
    api_secret: "BN_PH_5aGxM9bI-eMB9HXHIxR10"
  });

  module.exports = cloudinary;