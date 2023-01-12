import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  const prices = sequelize.define(
    'stock_prices',
    {
      stockPricesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      euro: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      dollar: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      livre: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );

  return prices;
};

export default model;
