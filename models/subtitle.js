'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subtitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Subtitle.init({
    projectId: DataTypes.INTEGER,
    inTime: DataTypes.INTEGER,
    outTime: DataTypes.INTEGER,
    text: DataTypes.STRING,
    inTimeVTT: DataTypes.STRING,
    outTimeVTT: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subtitle',
  });
  return Subtitle;
};

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
    Subtitle.belongsTo(models.Project, {
      foreignKey: 'projectId',
      onDelete: 'CASCADE'
    })
  };
  return Subtitle;
};