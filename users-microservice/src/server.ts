import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, syncDB } from "./config/database";
import { seedUsers } from "./config/seed";

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectDB(); // Conectar a la base de datos
    await syncDB(); // Sincronizar las tablas
    //await seedUsers(); // Insertar datos iniciales

    app.listen(PORT, () => {
      console.log(`[Users] Servidor escuchando en http://localhost:${PORT}`);
      console.log(`[Users] Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("[Users] Error al iniciar el servidor:", error);
  }
}

startServer();
