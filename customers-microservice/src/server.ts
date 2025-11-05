import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, syncDB } from "./config/database";
import { seedCustomers } from "./config/seed";

const PORT = process.env.PORT || 3002;

async function startServer() {
  try {
    await connectDB(); // Conectar a la base de datos
    await syncDB(); // Sincronizar las tablas
    //await seedCustomers(); // Insertar datos iniciales

    app.listen(PORT, () => {
      console.log(`[Customers] Servidor escuchando en http://localhost:${PORT}`);
      console.log(`[Customers] Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("[Customers] Error al iniciar el servidor:", error);
  }
}

startServer();
