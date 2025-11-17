import express from "express";
import productRoutes from "./routers/product.routers";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());

app.use("/products/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

app.use("/products",authMiddleware, productRoutes);

export default app;