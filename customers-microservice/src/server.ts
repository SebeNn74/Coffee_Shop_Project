import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, sequelize } from "./config/database";
import { seedCustomers } from "./config/seed";
import { CustomerEntity } from "./repositories/entities/customer.entity";

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  try {
    // Conectar con la base de datos
    await connectDB();

    // Sincronizar las tablas del modelo
    await CustomerEntity.sync({ alter: true });
    console.log("Tabla 'customers' sincronizada correctamente.");

    // Ejecutar datos iniciales
    await seedCustomers();
    console.log("Datos iniciales insertados.");

    // Servidor corriendo
    console.log(`Customers microservice listening on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
});
