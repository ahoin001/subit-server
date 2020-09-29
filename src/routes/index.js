var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('JDEOUFBOEOB');
});

module.exports = router;

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn('Subtitles', 'april', {
//         type: Sequelize.FLOAT,
//         allowNull: false
//       }),
//     ]);
//   },

//   down: (queryInterface) => {
//     return Promise.all([queryInterface.changeColumn('Subtitles', 'april')]);
//   },
// };