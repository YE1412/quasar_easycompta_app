import { DataTypes } from "sequelize";

const model = (sequelize) => {
  const actorType = sequelize.define(
    "personne_type",
    {
      actorTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
        allowNull: false,
      },
      seller: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: "actorTypeConstraint",
      },
      buyer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: "actorTypeConstraint",
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  return actorType;
};

export default model;
