import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { Sale } from "@/models/sale.model";
import { CreateSaleDTO } from "@/models/dtos/create-sale.dto";

export class SaleEntity
    extends Model<Sale, CreateSaleDTO>
    implements Sale {
    declare id: number;
    declare userId: number;
    declare customerId: number;
    declare totalAmount: number;
    declare status: "pending" | "completed" | "canceled";
    declare createdAt: Date;
}

SaleEntity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
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