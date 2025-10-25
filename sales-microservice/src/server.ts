import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";
import { seedSales } from "./config/seed"

const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
  await connectDB();
  await seedSales();
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});