'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wsb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.wsb.belongsTo(models.stocks, {foreignKey: 'ticker', targetKey: 'ticker'})
    }
  };
  wsb.init({
    ticker: DataTypes.STRING,
    sentiment: DataTypes.STRING,
    sentiment_score: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'wsb',
  });
  return wsb;
};