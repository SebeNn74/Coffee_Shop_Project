import express from "express";
import saleRouter from "./routers/sale.router";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());

app.use('/sales',authMiddleware, saleRouter);

export default app;