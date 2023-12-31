'use strict';
const { Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
       User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        onDelete:'cascade',
        hooks: true
      });

      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        hooks: true
      });

      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        hooks: true
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: "First name must be between 2 and 50 characters"
        },
        isAlpha: {
          args: true,
          msg: "First name is required"
        },
        notEmpty: {
          args: true,
          msg: "First name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: "Last name must be between 2 and 50 characters"
        },
        isAlpha: {
          args: true,
          msg: "Last name is required"
        },
        notEmpty: {
          args: true,
          msg: "Last name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 256],
          msg: "Email must be between 3 and 256 characters"
        },
        isEmail: {
          args: true,
          msg: 'Invalid email'
        },
        notEmpty: {
          args: true,
          msg: "Invalid email"
        }
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 30],
          msg: "Username must be between 4 and 30 characters"
        },
        notEmpty: {
          args: true,
          msg: "Username is required"
        },
        isAlphanumeric: {
          args: true,
          msg: "Username is required"
        },
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
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
      }
    }
  });
  return User;
};
