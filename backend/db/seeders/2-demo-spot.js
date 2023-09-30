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
      "address": "250 Brandon St APT 302",
      "city" : "San Jose",
      "state" : "California",
      "country" : "United States" ,
      "lat": 37.40267,
      "lng": 121.94321,
      "name": "Near The Bay Getaway ",
      "description": "Enjoy being near the San Francisco Bay area in this one-bedroom apartment! One garage spot is also included.",
      "price": 250
    },
    {
      "ownerId": 1,
      "address": "770 Claughton Island Dr APT 1003",
      "city" : "Miami",
      "state" : "Florida",
      "country" : "United States",
      "lat": 41.33697,
      "lng": 87.40878,
      "name": "Beautiful Beachside Condo",
      "description": "Beautiful beachside condo apartment with great views!",
      "price": 200
    },
    {
      "ownerId": 2,
      "address": "210 Bozeman Rd",
      "city" : "Bozeman",
      "state" : "Montana",
      "country" : "United States",
      "lat": 45.66218,
      "lng": 110.79464,
      "name": "The Little Cabin",
      "description": "Take time away from the city and book this one-bedroom, one-bath cabin situated by a lake. Large forest area behind the house as well.",
      "price": 220
    },
    {
      "ownerId": 2,
      "address": "111 N 3rd St",
      "city" : "Perkasie",
      "state" : "Pennysylvania",
      "country" : "United States",
      "lat": 40.37281,
      "lng": 75.28955,
      "name": "Vintage-style Loft",
      "description": "Vintage-style one-bedroom/one-bathroom space. The kitchen is well-maintained with modern appliances, but still retaining a vintage flair. Lots to do all within a 20-minute drive.",
      "price": 190
    },
    {
      "ownerId": 3,
      "address": "3256 Martin Rd APT 10",
      "city" : "Carmel",
      "state" : "California",
      "country" : "United States",
      "lat": 36.54635,
      "lng": 121.91600,
      "name": "California Dreamin'",
      "description": "Book this gorgeous, one-bedroom/one-bathroom unit and enjoy what Carmel-By-The-Sea, California has to offer.",
      "price": 320
    },
    {
    "ownerId": 3,
    "address": "233 N Balboa St UNIT 2806",
    "city" : "San Francisco",
    "state" : "California",
    "country" : "United States",
    "lat": 37.77720,
    "lng": 122.46115,
    "name": "Near the Bay",
    "description": "A one-bedroom/one-bathroom unit that is in proximity to several restaurants, shops, and nightclubs.",
    "price": 300
    },
    {
      "ownerId": 4,
      "address": "32 Forest Haven Lane",
      "city" : "Idaho Springs",
      "state" : "Colorado",
      "country" : "United States",
      "lat": 38.31852,
      "lng": 104.73864,
      "name": "Quiet Lakefront home",
      "description": "A two-bedroom/two-bathroom unit that is situated by a lake, and lots of trees behind the house.",
      "price": 270
    },
    {
      "ownerId": 4,
      "address": "63737 San Pancho St",
      "city" : "Xalisco",
      "state" : "Nayarit",
      "country" : "Mexico",
      "lat": 20.74919,
      "lng": 105.25362,
      "name": "Relaxing Escape",
      "description": "A gated two-bedroom/two-bathroom home that is a 20-minute drive from the city proper.",
      "price": 220
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
