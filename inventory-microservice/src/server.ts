import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, syncDB } from "./config/database";

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    await connectDB(); // Conectar a la base de datos
    await syncDB(); // Sincronizar las tablas
    //await seedSales(); // Insertar datos iniciales

    app.listen(PORT, () => {
      console.log(`[Inventory] Servidor escuchando en http://localhost:${PORT}`);
      console.log(`[Inventory] Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("[Inventory] Error al iniciar el servidor:", error);
  }
}

startServer();
