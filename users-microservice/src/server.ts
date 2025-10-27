import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";
import { seedUsers } from "./config/seed";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  await seedUsers();
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});