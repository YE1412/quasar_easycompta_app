import { DataTypes } from "sequelize";

const model = (sequelize) => {
  const user = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyLogo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deviseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "devise",
          key: "deviseId",
        },
        allowNull: false,
      },
      userTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_type",
          key: "userTypeId",
        },
        defaultValue: null,
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

  return user;
};

export default model;
