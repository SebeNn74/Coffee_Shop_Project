import express from "express";
import saleRouter from "./routers/sale.router";

const app = express();
app.use(express.json());

app.use('/sales', saleRouter);

export default app;