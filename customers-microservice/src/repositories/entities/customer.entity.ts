import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config/database";
import { Customer } from "@/models/customer.model";
import { CreateCustomerDto } from "@/models/dtos/create-customer.dto";

// Entidad Customer
export class CustomerEntity
    extends Model<Customer, CreateCustomerDto>
    implements Customer {
    declare id: number;
    declare name: string;
    declare phone: string;
    declare email: string;
    declare address?: string;
    declare city?: string;
}

// Inicialización de la entidad Customer
CustomerEntity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "Customer",
        tableName: "customers",
        timestamps: false,
    }
);