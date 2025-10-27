import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Product } from "./product.model";

export class ProductStock extends Model {
  declare id: number;
  declare product_id: number;
  declare quantity: number;
}

ProductStock.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, tableName: "product_stock", timestamps: false }
);

ProductStock.belongsTo(Product, { foreignKey: "product_id" });
Product.hasOne(ProductStock, { foreignKey: "product_id" });
