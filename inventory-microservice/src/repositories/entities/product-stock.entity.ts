import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { ProductStock } from "@/models/product-stock.model";
import { CreateProductStockDTO } from "@/models/dtos/product-stock.dto";
import { ProductEntity } from "./product.entity";

export class ProductStockEntity
  extends Model<ProductStock, CreateProductStockDTO>
  implements ProductStock
{
  declare id: number;
  declare product_id: number;
  declare quantity: number;
  declare reserved: number;
}

ProductStockEntity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    reserved: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: "ProductStock",
    tableName: "product_stock",
    timestamps: false,
  }
);

ProductEntity.hasOne(ProductStockEntity, {
  sourceKey: "id",
  foreignKey: "product_id",
  as: "product_stock",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ProductStockEntity.belongsTo(ProductEntity, {
  foreignKey: "product_id",
  as: "product",
});
