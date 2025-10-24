import express from 'express';
// import orderRouter from './infrastructure/api/order.router';

const app = express();
app.use(express.json());

// app.use('/orders', orderRouter);

export default app;