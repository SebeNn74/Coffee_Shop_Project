import { DataTypes } from "sequelize";
import { sequelize } from "@/config/database";

export const SaleEntity = sequelize.define("Sale", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // Asegúrate que sea UNSIGNED
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "sales",
  timestamps: false,
});
