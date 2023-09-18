'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [{
      "spotId": 1,
      "url": "https://images.pexels.com/photos/1693946/pexels-photo-1693946.jpeg",
      "preview": true
    },
    {
      "spotId": 1,
      "url": "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
      "preview": false
    },
    {
      "spotId": 1,
      "url": "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg",
      "preview": false
    },
    {
      "spotId": 1,
      "url": "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg",
      "preview": false
    },
    {
      "spotId": 1,
      "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://images.pexels.com/photos/14997207/pexels-photo-14997207/free-photo-of-city-building-office-architecture.jpeg",
      "preview": true
    },
    {
      "spotId": 2,
      "url": "https://images.pexels.com/photos/533157/pexels-photo-533157.jpeg",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://images.pexels.com/photos/18258464/pexels-photo-18258464/free-photo-of-photo-of-a-contemporary-bathroom.jpeg",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://images.pexels.com/photos/13945429/pexels-photo-13945429.jpeg",
      "preview": true
    },
    {
      "spotId": 3,
      "url": "https://images.pexels.com/photos/2659629/pexels-photo-2659629.jpeg",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://images.pexels.com/photos/13945431/pexels-photo-13945431.jpeg",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://images.pexels.com/photos/12513476/pexels-photo-12513476.jpeg",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://images.pexels.com/photos/5940869/pexels-photo-5940869.jpeg",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://images.pexels.com/photos/16631327/pexels-photo-16631327/free-photo-of-vintage-house-in-perkasie-in-pennsylvania.jpeg",
      "preview": true
    },
    {
      "spotId": 4,
      "url": "https://images.pexels.com/photos/5461565/pexels-photo-5461565.jpeg",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg",
      "preview": false
    },
    {
      "spotId": 4,
      "url": " https://images.pexels.com/photos/16088315/pexels-photo-16088315/free-photo-of-dark-photo-of-a-vintage-bathroom-with-a-small-bathtub.jpeg",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://images.pexels.com/photos/5824523/pexels-photo-5824523.jpeg",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://images.pexels.com/photos/6010285/pexels-photo-6010285.jpeg",
      "preview": true
    },
    {
      "spotId": 5,
      "url": "https://images.pexels.com/photos/15824791/pexels-photo-15824791/free-photo-of-landscape-nature-beach-red.jpeg",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://images.pexels.com/photos/11671085/pexels-photo-11671085.jpeg",
      "preview": false
    },
    {
      "spotId": 5,
      "url": "https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://images.pexels.com/photos/13677412/pexels-photo-13677412.jpeg",
      "preview": true
    },
    {
      "spotId": 6,
      "url": "https://images.pexels.com/photos/7635919/pexels-photo-7635919.jpeg",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://images.pexels.com/photos/3634740/pexels-photo-3634740.jpeg",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://images.pexels.com/photos/4210376/pexels-photo-4210376.jpeg",
      "preview": false
    },
    {
      "spotId": 6,
      "url": "https://images.pexels.com/photos/4202938/pexels-photo-4202938.jpeg",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://images.pexels.com/photos/65225/boat-house-cottage-waters-lake-65225.jpeg",
      "preview": true
    },
    {
      "spotId": 7,
      "url": "https://images.pexels.com/photos/13421909/pexels-photo-13421909.jpeg",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://images.pexels.com/photos/4946961/pexels-photo-4946961.jpeg",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://images.pexels.com/photos/7598359/pexels-photo-7598359.jpeg",
      "preview": false
    },
    {
      "spotId": 7,
      "url": "https://images.pexels.com/photos/15699340/pexels-photo-15699340/free-photo-of-bedroom-interior-design-in-rustic-home.jpeg",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://images.pexels.com/photos/14760340/pexels-photo-14760340.jpeg",
      "preview": true
    },
    {
      "spotId": 8,
      "url": "https://images.pexels.com/photos/5712150/pexels-photo-5712150.jpeg",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://images.pexels.com/photos/4761988/pexels-photo-4761988.jpeg",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://images.pexels.com/photos/16142769/pexels-photo-16142769/free-photo-of-blue-chairs-in-an-elegant-modern-interior.jpeg",
      "preview": false
    },
    {
      "spotId": 8,
      "url": "https://images.pexels.com/photos/5096199/pexels-photo-5096199.jpeg",
      "preview": false
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
