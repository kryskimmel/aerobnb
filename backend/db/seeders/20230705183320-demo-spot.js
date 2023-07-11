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
    },
    {
      "ownerId": 2,
      "address": "535 Michigan Avenue",
      "city" : "Chicago",
      "state" : "Illinois",
      "country" : "United States",
      "lat": 41.89198,
      "lng": 87.62378,
      "name": "535 N. Michigan Avenue Condo",
      "description": "Enjoy great views of the Magnificent Mile on the 28th floor of this 1 bedroom unit.",
      "price": 388
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
