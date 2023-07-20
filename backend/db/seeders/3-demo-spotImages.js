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
      "url": "https://p.rdcpix.com/v01/l5fef5144-m0od-w1024_h768_x2.jpg",
      "preview": true
    },
    {
      "spotId": 1,
      "url": "https://ssl.cdn-redfin.com/photo/68/mbphoto/990/genMid.11826990_12_0.jpg",
      "preview": false
    },
    {
      "spotId": 2,
      "url": "https://photos.zillowstatic.com/fp/d724e4ebc7bbd4ec3eaacfc449b05634-cc_ft_960.jpg",
      "preview": true
    },
    {
      "spotId": 2,
      "url": "https://www.cbhometour.com/535-N-Michigan-Avenue-1009-Chicago-IL-60611/photos/gallery/8.jpg?ts=1614973088948",
      "preview": false
    },
    {
      "spotId": 3,
      "url": "https://ssl.cdn-redfin.com/photo/rent/54b171cd-1654-4360-ad7f-931043c896e8/bigphoto/0_2.jpg",
      "preview": true
    },
    {
      "spotId": 3,
      "url": "https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/aaba318ff7b756a1af7869d34154ec5e",
      "preview": false
    },
    {
      "spotId": 4,
      "url": "https://photos.zillowstatic.com/fp/28aa3002fc8ccb426cf9272b56ac510c-p_c.jpg",
      "preview": true
    },
    {
      "spotId": 4,
      "url": "https://ssl.cdn-redfin.com/photo/122/mbphoto/23R/genMid.2313423R_35_2.jpg",
      "preview": false
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
