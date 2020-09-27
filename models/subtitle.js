'use strict';

module.exports = (sequelize, DataTypes) => {
  const Subtitle = sequelize.define('Subtitle', {
    projectId: DataTypes.INTEGER,
    inTime: DataTypes.INTEGER,
    outTime: DataTypes.INTEGER,
    text: DataTypes.STRING,
    inTimeVTT: DataTypes.STRING,
    outTimeVTT: DataTypes.STRING
  }, {});
  Subtitle.associate = function (models) {
    // associations can be defined here
    Subtitle.belongsTo(models.User, {
      foreignKey: 'projectId',
      onDelete: 'CASCADE'
    })
  };
  return Subtitle;
};

