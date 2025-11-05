import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, syncDB } from "./config/database";
import { seedSales } from "./config/seed";

// Importar las entidades antes de sincronizar
import "@/repositories/entities/sale.entity";
import "@/repositories/entities/sale_item.entity";

const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
  try {
    await connectDB(); // Conectar a la base de datos
    await syncDB(); // Sincronizar las tablas
    //await seedSales(); // Insertar datos iniciales

    // Servidor listo
    console.log(
      `[Sales] Sales-microservice escuchando en http://localhost:${PORT}`
    );
    console.log(`[Sales] Health check: http://localhost:${PORT}/health`);
  } catch (error) {
    console.error("[Sales] Error al iniciar el servicio:", error);
  }
});
