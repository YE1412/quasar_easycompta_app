import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  const service = sequelize.define(
    'produitservice',
    {
      serviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      montantHt: {
        type: DataTypes.FLOAT,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantite: {
        type: DataTypes.INTEGER,
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
  return service;
};

export default model;
