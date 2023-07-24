'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'cascade'
      });

      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'cascade'
      });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        contains: {
          args: "-",
          msg: "Invalid format for start date"
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        contains: {
          args: "-",
          msg: "Invalid format for end date"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
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
  return Booking;
};
