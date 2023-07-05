'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [{
      "ownerId": 1,
      "address": "2401 Saint Lawerence Ave",
      "city" : "Long Beach",
      "state" : "Indiana",
      "country" : "United States" ,
      "lat": 41.74625,
      "lng": 86.85338,
      "name": "Down By The Lake Getaway",
      "description": "Come enjoy gorgeous views of Lake Michigan!",
      "price": 250.00

    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
