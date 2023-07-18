'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return queryInterface.bulkInsert(options, [{
      "reviewId": 1,
      "url": "https://www.compass.com/m/d6feba4bf09a0035772841bbb07d9740784977a1_img_0_83c14/origin.jpg",
    },
    {
      "reviewId": 1,
      "url": "https://images1.apartments.com/i2/SWo3MrYopaW4OZN7ViOLPGvbNpTOiYtr2rGyziSjuf4/111/535-n-michigan-ave-unit-2112-chicago-il-primary-photo.jpg",
    },
    {
      "reviewId": 2,
      "url": "https://www.thespruce.com/thmb/ARG9YVZh8cZxTgXhzqrfRhOHlEA=/1178x0/filters:no_upscale():max_bytes(150000):strip_icc()/YDrq5F-5b10345bfa6bcc0036abe9bd.jpg",
    },
    {
      "reviewId": 3,
      "url": "https://p.rdcpix.com/v01/l5fef5144-m0od-w1024_h768_x2.jpg",
    },
    {
      "reviewId": 4,
      "url": "https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/ce84dba56ede53f732cd2c9099cae272",
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
