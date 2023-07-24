'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        onDelete: 'cascade'
      });
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        isUrl: {
          args: true,
          msg: "URL is not valid"
        },
        notEmpty: {
          args: true,
          msg: "URL is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
    defaultScope: {
      attributes: {
        exclude: ['reviewId', 'createdAt', 'updatedAt']
      }
    },
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        record.dataValues.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      },
      beforeUpdate: (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        record.dataValues.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      },
      afterCreate: (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        record.dataValues.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      },
      afterUpdate: (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        record.dataValues.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      }
    }
  });
  return ReviewImage;
};
