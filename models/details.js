'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.details.belongsTo(models.stocks)
    }
  };
  details.init({
    ticker: DataTypes.STRING,
    date: DataTypes.DATE,
    high: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    close: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'details',
  });
  return details;
};