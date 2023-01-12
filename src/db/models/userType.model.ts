import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  const userType = sequelize.define(
    'user_type',
    {
      userTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      regular: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: 'userTypeConstraint',
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: 'userTypeConstraint',
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  return userType;
};

export default model;
