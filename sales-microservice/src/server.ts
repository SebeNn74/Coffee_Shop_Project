import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB, sequelize } from "./config/database.js";
import { seedSales } from "./config/seed.js";

// Importar las entidades antes de sincronizar
import "@/repositories/entities/sale.entity.js";
import "@/repositories/entities/sale_item.entity.js";

const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // 2Crear tablas si no existen
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente.");

    // Insertar datos iniciales
    await seedSales();
    console.log("Datos iniciales insertados.");

    // Servidor listo
    console.log(`Sales microservice listening on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  } catch (error) {
    console.error("Error al iniciar el servicio:", error);
  }
});
