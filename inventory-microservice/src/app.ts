import express from "express";
import productRoutes from "./routers/product.routers";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());

// MIDDLEWARE DE LOGS
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] Request to ${req.method} ${
            req.originalUrl
        } | Instance: ${process.env.HOSTNAME} | Port: ${process.env.PORT}`
    );
    next();
});

// ENDPOINT HEALTH
app.use("/products/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

app.use("/products",authMiddleware, productRoutes);

export default app;