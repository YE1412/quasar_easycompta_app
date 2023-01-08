import { DataTypes } from "sequelize";

const model = (sequelize) => {
  const contains = sequelize.define(
    "contains",
    {
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "commande",
          key: "orderId",
        },
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "produitservice",
          key: "serviceId",
        },
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
  return contains;
};

export default model;
