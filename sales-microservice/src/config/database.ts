import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME || "coffee_shop_db",
    process.env.DB_USER || "admin",
    process.env.DB_PASS || "12345",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: 'mysql',
        port: Number(process.env.DB_PORT) || 3306,
        logging: false, // NO Logs de SQL en consola
    });

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con MySQL.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}