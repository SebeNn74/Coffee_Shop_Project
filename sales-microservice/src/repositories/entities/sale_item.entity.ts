import { DataTypes } from "sequelize";
import { sequelize } from "@/config/database";
import { SaleEntity } from "./sale.entity";

export const SaleItemEntity = sequelize.define("SaleItem", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // Igual tipo UNSIGNED
    autoIncrement: true,
    primaryKey: true,
  },
  saleId: {
    type: DataTypes.INTEGER.UNSIGNED, // Debe coincidir exactamente con Sale.id
    allowNull: false,
    references: {
      model: SaleEntity,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: "sale_items",
  timestamps: false,
});
