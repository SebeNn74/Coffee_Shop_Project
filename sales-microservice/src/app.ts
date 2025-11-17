import express from "express";
import saleRouter from "./routers/sale.router";
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
app.use("/sales/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

app.use('/sales',authMiddleware, saleRouter);

export default app;