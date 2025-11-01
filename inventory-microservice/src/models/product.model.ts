import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> 
  implements ProductAttributes {
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