import { DataTypes, Model} from "sequelize";
import { sequelize } from "@/config/database";
import { User } from "@/models/user.model";
import { CreateUserDto } from "@/models/dtos/create-user.dto";

export class UserEntity
    extends Model<User, CreateUserDto>
    implements User {
    declare id: number;
    declare name: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
    declare phone: string;
    declare isActive: boolean;
}

UserEntity.init(
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
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
    }
);