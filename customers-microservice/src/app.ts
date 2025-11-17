import express from "express";
import customersRouter from "./routers/customer.router";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(express.json());

app.use("/customers",authMiddleware, customersRouter);

export default app;