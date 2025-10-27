import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Product extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: string;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING(50) },
  },
  { sequelize, tableName: "product", timestamps: false }
);
