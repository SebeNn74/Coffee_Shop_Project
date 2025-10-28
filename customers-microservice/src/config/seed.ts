// src/config/database.ts
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME || "coffee_shop_db",
    process.env.DB_USER || "admin",
    process.env.DB_PASS || "admin123",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: 'mysql',
        port: Number(process.env.DB_PORT) || 3306,
        logging: false, // NO Logs de SQL en consola
    }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con MySQL.");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

// src/config/seed.ts
import { CustomerEntity } from "@/repositories/entities/customer.entity";

export async function seedCustomers() {
    await CustomerEntity.bulkCreate(
        [
            {
                name: "Carlos Martínez",
                phone: "3001234567",
                email: "carlos.martinez@gmail.com",
                address: "Calle 10 #20-30",
                city: "Tunja"
            },
            {
                name: "Laura Gómez",
                phone: "3109876543",
                email: "laura.gomez@gmail.com",
                address: "Carrera 5 #15-40",
                city: "Tunja"
            },
            {
                name: "Pedro Sánchez",
                phone: "3205551234",
                email: "pedro.sanchez@gmail.com",
                address: "Avenida Norte #25-10",
                city: "Duitama"
            }
        ],
        { ignoreDuplicates: true }
    );
    console.log("✅ Datos de clientes inicializados");
}