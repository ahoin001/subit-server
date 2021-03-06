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
        type: Sequelize.INTEGER // These are strings after migration
      },
      outTime: {
        type: Sequelize.INTEGER // These are strings after migration
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

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn('Subtitles', 'inTime', {
//         type: Sequelize.DECIMAL,
//         // allowNull: false
//       }),
//     ]);
//   },

//   down: (queryInterface) => {
//     return Promise.all([queryInterface.changeColumn('Subtitles', 'inTime')]);
//   },
// };

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.addColumn('Subtitles', 'june', {
//         type: Sequelize.STRING,
//         allowNull: true,
//       }),
//     ]);
//   },

//   down: (queryInterface) => {
//     return Promise.all([queryInterface.removeColumn('Subtitles', 'june')]);
//   },
// };