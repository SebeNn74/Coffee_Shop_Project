import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { Product } from "@/models/product.model";
import { CreateProductDTO } from "@/models/dtos/product.dto";
import { ProductStock } from "@/models/product-stock.model";

export class ProductEntity
  extends Model<Product, CreateProductDTO>
  implements Product
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: string;
  declare stock?: ProductStock;
}

ProductEntity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING(50) },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
);
