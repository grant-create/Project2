'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.stocks.hasOne(models.wsb, {foreignKey: 'ticker', targetKey: 'ticker'})
      models.stocks.hasOne(models.details)
    }
  };
  stocks.init({
    ticker: DataTypes.STRING,
    rollingAvg: DataTypes.FLOAT,
    lastClose: DataTypes.FLOAT,
    date: DataTypes.DATE,
    twentyDayBreakout: DataTypes.BOOLEAN,
    seventyDayBreakout: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'stocks',
  });
  return stocks;
};