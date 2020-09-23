'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Users', [{
//         userName: 'JohnTron',
//         email: 'demo@demo.com',
//         password: '$321!pass!123$',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }], {});
//   },
// down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Users', null, {});
//   }
// };


// npx sequelize-cli model:generate --name Subtitle --attributes projectId:integer,inTime:integer,outTime:integer,text:string,inTimeVTT:string,outTimeVTT:string