import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { SaleItems } from "@/models/sale_item.model";
import { CreateSaleItemsDTO } from "@/models/dtos/create-sale_item.dto";
import { SaleEntity } from "./sale.entity";

export class SaleItemEntity
    extends Model<SaleItems, CreateSaleItemsDTO>
    implements SaleItems {
    declare id: number;
    declare saleId: number;
    declare productId: number;
    declare quantity: number;
    declare unitPrice: number;
    declare discount?: number;
    declare sale?: SaleEntity;
}

SaleItemEntity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        saleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "SaleItem",
        tableName: "sale_items",
        timestamps: false,
    }
);

// Relación muchos a uno entre SaleItem y Sale
SaleItemEntity.belongsTo(SaleEntity, {
  foreignKey: 'saleId',
  as: 'sale'
});
// Relación uno a muchos entre Sale y SaleItem
SaleEntity.hasMany(SaleItemEntity, {
  sourceKey: 'id',
  foreignKey: 'saleId',
  as: 'sale_items'
});