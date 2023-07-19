'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [{
      "spotId": 1,
      "userId": 3,
      "startDate": "2023-10-25",
      "endDate": "2023-10-28"
    },
    {
      "spotId": 2,
      "userId": 1,
      "startDate": "2023-07-17",
      "endDate": "2023-07-18"
    },
    {
      "spotId": 4,
      "userId": 2,
      "startDate": "2023-12-02",
      "endDate": "2023-12-04"
    },
    {
      "spotId": 3,
      "userId": 1,
      "startDate": "2023-08-05",
      "endDate": "2023-08-06"
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookigns';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
