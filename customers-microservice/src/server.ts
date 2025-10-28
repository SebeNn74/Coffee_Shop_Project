import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";
import { seedCustomers } from "./config/seed";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await connectDB();
  await seedCustomers();
  console.log(`🚀 Customers microservice listening on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
});