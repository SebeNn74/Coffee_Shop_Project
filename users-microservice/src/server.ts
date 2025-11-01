import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { sequelize, connectDB } from "./config/database";
import { seedUsers } from "./config/seed";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conecta con la base de datos
    await connectDB();

    // Sincroniza los modelos (crea tablas si no existen)
    await sequelize.sync({ force: true }); 
    console.log("Tablas sincronizadas correctamente.");

    // Inserta los datos iniciales
    await seedUsers();
    console.log("Datos iniciales insertados.");

    // Inicia el servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
