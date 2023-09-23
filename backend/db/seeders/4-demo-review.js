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
      "spotId": 1,
      "userId": 2,
      "review": 'Everything was well-maintained and the place had a cozy, luxurious feel to it. I would definitely stay here again if I ever come back to San Jose!',
      "stars": 4,
    },
    {
      "spotId": 1,
      "userId": 3,
      "review": 'Staying here was spectacular.',
      "stars": 5,
    },
    {
      "spotId": 2,
      "userId": 3,
      "review": 'Stayed at another place of John\'s. Phenomenal is all I have to say',
      "stars": 5,
    },
    {
      "spotId": 2,
      "userId": 4,
      "review": 'Comfortable and very close to the beach!',
      "stars": 4,
    },
    {
      "spotId": 3,
      "userId": 3,
      "review": 'This was my first time staying in a cabin for a few days. Aside from minor issues with the bathrom, it was a pleasant stay.',
      "stars": 3,
    },
    {
      "spotId": 3,
      "userId": 4,
      "review": 'The owner left a canoe and two paddle boards for us to use while we stayed here, so we had a blast with that! Cabin vibes were comfortable.',
      "stars": 5,
    },
    {
      "spotId": 4,
      "userId": 4,
      "review": 'Cleanliness of the place was a big part of the issue in staying here. Lots of cobwebs. Also saw a rat run across the room. Will not be staying here again.',
      "stars": 1,
    },
    {
      "spotId": 4,
      "userId": 1,
      "review": 'Liked the vintage feel of the place while staying here. Although I wish this place was as clean as the pictures looked.',
      "stars": 3,
    },
    {
      "spotId": 5,
      "userId": 1,
      "review": 'Had a very pleasant stay here for three days. So much light in the unit to bask myself in during the day, and a calming moonlight view to see at night.',
      "stars": 5,
    },
    {
      "spotId": 5,
      "userId": 2,
      "review": 'My husband stayed here for a business trip and told me to take a vacation here with my sister. I am so glad I did.',
      "stars": 5,
    },
    {
      "spotId": 6,
      "userId": 2,
      "review": 'This place was in proximity to several places of various international cuisine, which was awesome. I also liked how clean this place was upon my arrival here.',
      "stars": 4,
    },
    {
      "spotId": 6,
      "userId": 4,
      "review": 'Nice unit to stay in if you are ever planning to visit SF',
      "stars": 4,
    },
    {
      "spotId": 7,
      "userId": 1,
      "review": 'Brought my canoe out here and enjoyed seeing the wildlife at and around the lake. Very comfortable place to stay with lots to do.',
      "stars": 5,
    },
    {
      "spotId": 7,
      "userId": 3,
      "review": 'Gorgeous lake that is in view of the house, but there were a few things that I didn\'t particularly like about my stay here.',
      "stars": 2,
    },
    {
      "spotId": 8,
      "userId": 2,
      "review": 'Four words: I would come back.',
      "stars": 5,
    },
    {
      "spotId": 8,
      "userId": 3,
      "review": 'Staying here was a dream.',
      "stars": 5,
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
