'use strict';

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Project extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Project.init({
    // subtitleArray: DataTypes.ARRAY,
    // videoURL: DataTypes.STRING,
    // title: DataTypes.STRING,
    // genre: DataTypes.STRING,
    // description: DataTypes.STRING,
    // videoURL: DataTypes.STRING,
    // language: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Project',
//   });
//   return Project;
// };

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    userId: DataTypes.INTEGER,
    subtitleArray: DataTypes.ARRAY(DataTypes.JSON),
    videoURL: DataTypes.STRING,
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.STRING,
    videoURL: DataTypes.STRING,
    language: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })

    Project.hasMany(models.Subtitle, {
      foreignKey: 'projectId',
    })
  };
  return Project;
};