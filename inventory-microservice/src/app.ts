import express from "express";
import productRoutes from "./routers/product.routers";

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

export default app;