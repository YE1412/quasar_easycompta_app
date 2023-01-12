import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  const language = sequelize.define(
    'langue',
    {
      langueId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      libelle: {
        type: DataTypes.CHAR,
      },
      nom: {
        type: DataTypes.CHAR,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  return language;
};

export default model;
