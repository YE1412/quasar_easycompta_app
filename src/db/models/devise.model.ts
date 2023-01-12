import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  const devise = sequelize.define(
    'devise',
    {
      deviseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      symbole: {
        type: DataTypes.CHAR(1),
      },
      libelle: {
        type: DataTypes.CHAR(255),
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
  return devise;
};

export default model;
