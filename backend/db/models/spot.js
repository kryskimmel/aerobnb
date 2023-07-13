'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        as: 'previewImage'
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[\w\-\s]+$/,
          msg: "The address field must contain only alphanumeric characters and spaces"
        },
        len: [5, 50],
        notEmpty: true,
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          is: {
            args: /^[a-z\s]*$/i,
            msg: "The city field must contain only alphabetical characters and spaces"
          },
          len: [2, 20],
          notEmpty: true,
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          is: {
            args: /^[a-z\s]*$/i,
            msg: "The state field must contain only alphabetical characters and spaces"
          },
          len: [2, 20],
          notEmpty: true,
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z\s]*$/i,
          msg: "The country field must contain only alphabetical characters and spaces"
        },
        len: [2, 20],
        notEmpty: true,
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true,
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[\w\-\s]+$/,
          msg: "The name field must contain only alphanumeric characters and spaces"
        },
        len: [2, 50],
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 500],
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  },
  {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
