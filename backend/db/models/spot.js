'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId' ,
        as: 'Owner',
        onDelete: 'cascade'
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'cascade',
        hooks: true
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        as: 'previewImage'
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'cascade',
        hooks: true
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'avgRating'
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'avgStarRating'
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'numReviews'
      });

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'cascade',
        hooks: true
      });
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
        len: {
          args: [5, 50],
          msg: "Address must be between 5 and 50 characters"
        },
        notEmpty: {
          args: true,
          msg: 'Street address is required'
        },
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
        len: {
          args: [2, 20],
          msg: "City must be between 2 and 20 characters"
        },
        notEmpty: {
          args: true,
          msg: 'City is required'
        },
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
          len: {
            args: [2, 20],
            msg: "State must be between 2 and 20 characters"
          },
          notEmpty: {
            args: true,
            msg: 'State is required'
          },
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
        len: {
          args: [2, 20],
          msg: "Country must be between 2 and 20 characters"
        },
        notEmpty: {
          args: true,
          msg: 'Country is required'
        },
      }
    },
    lat: {
      type: DataTypes.DECIMAL(4,8),
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Latitude is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Latitude is required'
        },
      }
    },
    lng: {
      type: DataTypes.DECIMAL(4,8),
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Longitude is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Longitude is required'
        },
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
        len: {
          args: [2, 50],
          msg: "Name must be less than 50 characters"
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 500],
          msg: "Description must be between 2 and 500 characters"
        },
        notEmpty: {
          args: true,
          msg: 'Description is required'
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price per day is required'
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'Spot',
    scopes: {
      removeAttributes: {
        attributes: {
          exclude: ["id", "ownerId", "address", "city", "state", "country", "lat",
                    "lng", "name", "description", "price", "createdAt", "updatedAt" ]
        }
      }
    },
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
      },
      beforeUpdate: (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
      }
    }
  });
  return Spot;
};
