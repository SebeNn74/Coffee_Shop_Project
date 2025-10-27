import express from "express";
import { sequelize } from "./config/database";
import productRoutes from "./routers/product.routers";

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

sequelize.sync().then(() => {
  console.log("Database connected and synced.");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Inventory service running on port ${PORT}`));

export default app;