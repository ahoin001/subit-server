'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subtitles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Projects',
          key: 'id',
          as: 'projectId',
        }
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      inTime: {
        type: Sequelize.INTEGER
      },
      outTime: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      inTimeVTT: {
        type: Sequelize.STRING
      },
      outTimeVTT: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subtitles');
  }
};