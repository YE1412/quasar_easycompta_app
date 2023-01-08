import { DataTypes } from "sequelize";

const model = (sequelize) => {
  const payment = sequelize.define(
    "payment",
    {
      paymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      etat: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
      },
      paymentValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "payment_type",
          key: "paymentTypeId",
        },
      },
      // orderId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   reference: {
      //     model: "commande",
      //     key: "orderId",
      //   },
      // },
      factureId: {
        type: DataTypes.INTEGER,
        reference: {
          model: "facture",
          key: "factureId",
        },
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  return payment;
};

export default model;
