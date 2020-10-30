'use strict';

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    userId: DataTypes.INTEGER,
    subtitleArray: DataTypes.ARRAY(DataTypes.JSON),
    videoURL: DataTypes.STRING,
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.STRING,
    videoURL: DataTypes.STRING,
    cloudId: DataTypes.STRING
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