'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkInsert(options, [{
      "spotId": 2,
      "userId": 1,
      "review": 'Spectacular place to stay at! Love how close I am to everything!',
      "stars": 5.0,
    },
    {
      "spotId": 4,
      "userId": 2,
      "review": 'You can tell the owner really keeps their place maintained. Was a pleasant place to stay at.',
      "stars": 5.0,
    },
    {
      "spotId": 1,
      "userId": 3,
      "review": 'I needed a break away from the city and this home which was only a few blocks away from the beach was what I needed.',
      "stars": 4.5,
    },
    {
      "spotId": 3,
      "userId": 1,
      "review": 'Lovely apartment.',
      "stars": 4.0,
    },
    {
      "spotId": 4,
      "userId": 3,
      "review": 'New Buffalo is such a charming beach town. What a great place to stay at.',
      "stars": 5.0,
    },
    {
      "spotId": 1,
      "userId": 2,
      "review": 'Good enough place to stay. Wish there was more to do within walking distance.',
      "stars": 3.0,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
