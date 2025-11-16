import express from "express";
import saleRouter from "./routers/sale.router";

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

app.use('/sales', saleRouter);

export default app;