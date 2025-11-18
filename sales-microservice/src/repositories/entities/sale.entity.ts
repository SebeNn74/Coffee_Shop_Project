import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { Sale } from "@/models/sale.model";
import { CreateSaleDataDTO } from "@/models/dtos/sale.dto";
import { SaleItemEntity } from "./sale_item.entity";

export class SaleEntity extends Model<Sale, CreateSaleDataDTO> implements Sale {
  declare id: number;
  declare user_id: number;
  declare customer_id: number;
  declare totalAmount: number;
  declare status: "pending" | "completed" | "canceled";
  declare createdAt: Date;
  declare items?: SaleItemEntity[];
}

SaleEntity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    customer_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    totalAmount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Sale",
    tableName: "sales",
    timestamps: false,
  }
);

// Relación uno a muchos entre Sale y SaleItems
SaleEntity.hasMany(SaleItemEntity, {
  sourceKey: "id",
  foreignKey: "sale_id",
  as: "sale_items",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// Relación inversa
SaleItemEntity.belongsTo(SaleEntity, {
  foreignKey: "sale_id",
  as: "sale",
});
