import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { SaleItem } from "@/models/sale_item.model";
import { CreateSaleItemsDTO } from "@/models/dtos/sale_item.dto";
import { SaleEntity } from "./sale.entity";

export class SaleItemEntity
  extends Model<SaleItem, CreateSaleItemsDTO>
  implements SaleItem {
  declare id: number;
  declare sale_id: number;
  declare product_id: number;
  declare quantity: number;
  declare unitPrice: number;
  declare discount: number;
  declare sale?: SaleEntity;
}

SaleItemEntity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sale_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    product_id: {
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
  },
  {
    sequelize,
    modelName: "SaleItems",
    tableName: "sale_items",
    timestamps: false,
  }
);
