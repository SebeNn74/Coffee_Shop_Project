import express from "express";
import customersRouter from "./routers/customer.router";

const app = express();

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ 
    status: "OK", 
    service: "customers-microservice",
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/customers", customersRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;