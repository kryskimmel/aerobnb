'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'cascade'
      });
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
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
    preview : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: false,
          msg: "Please provide a value for preview"
        },
      }
    }
  },
  {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt']
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
  return SpotImage;
};
