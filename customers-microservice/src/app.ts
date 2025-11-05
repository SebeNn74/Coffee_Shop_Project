import express from "express";
import customersRouter from "./routers/customer.router";

const app = express();
app.use(express.json());

app.use("/customers", customersRouter);

export default app;