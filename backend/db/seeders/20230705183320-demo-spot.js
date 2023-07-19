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
      "ownerId": 3,
      "address": "535 N Michigan Avenue UNIT 2805",
      "city" : "Chicago",
      "state" : "Illinois",
      "country" : "United States",
      "lat": 41.89198,
      "lng": 87.62378,
      "name": "535 N Michigan Avenue Condo",
      "description": "Enjoy great views of the Magnificent Mile on the 28th floor of this 1 bedroom unit.",
      "price": 388
    },
    {
      "ownerId": 2,
      "address": "2930 N Pine Grove Ave APT 403",
      "city" : "Chicago",
      "state" : "Illinois",
      "country" : "United States",
      "lat": 41.93508,
      "lng": 87.64209,
      "name": "Pine Grove Apartments",
      "description": "1Br/1Ba. Building is in proximity to many shops and restaurants!",
      "price": 290
    },
    {
      "ownerId": 1,
      "address": "231 S Norton St",
      "city" : "New Buffalo",
      "state" : "Michigan",
      "country" : "United States",
      "lat": 41.79304,
      "lng": 86.73675,
      "name": "Two bedroom home",
      "description": "Two bedroom home that is only a few blocks away from various cafes, restaurants, and shops.",
      "price": 280
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
