import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, syncDB } from "./config/database";

// Importar las entidades antes de sincronizar
import "@/repositories/entities/product.entity";
import "@/repositories/entities/product-stock.entity";

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  try {
    await connectDB(); // Conectar a la base de datos
    await syncDB(); // Sincronizar las tablas

    // Servidor listo
    console.log(
      `[Inventory] Inventory-microservice escuchando en http://localhost:${PORT}`
    );
    console.log(`[Inventory] Health check: http://localhost:${PORT}/health`);
  } catch (error) {
    console.error("[Inventory] Error al iniciar el servicio:", error);
  }
});
