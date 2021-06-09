'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rollingAvgData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rollingAvgData.init({
    ticker: DataTypes.STRING,
    date: DataTypes.DATE,
    close: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'rollingAvgData',
  });
  return rollingAvgData;
};