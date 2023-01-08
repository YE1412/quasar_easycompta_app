import { DataTypes } from "sequelize";

const model = (sequelize) => {
  const invoice = sequelize.define(
    "facture",
    {
      factureId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
      invoiceHTPrice: {
        type: DataTypes.FLOAT,
      },
      invoiceTTPrice: {
        type: DataTypes.FLOAT,
      },
      languageId: {
        type: DataTypes.INTEGER,
        reference: {
          model: "langue",
          key: "langueId",
        },
      },
      deviseId: {
        type: DataTypes.INTEGER,
        reference: {
          model: "devise",
          key: "deviseId",
        },
      },
      tvaValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "personne",
          key: "actorId",
        },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "personne",
          key: "actorId",
        },
      },
      administratorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        reference: {
          model: "user",
          key: "userId",
        },
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  return invoice;
};

export default model;
