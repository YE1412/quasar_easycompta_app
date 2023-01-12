import { DataTypes } from 'sequelize';

const model = (sequelize) => {
  const paymentType = sequelize.define(
    'payment_type',
    {
      paymentTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: 'paymentTypeConstraint',
      },
      esp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: 'paymentTypeConstraint',
      },
      chq: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: 'paymentTypeConstraint',
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  return paymentType;
};

export default model;
