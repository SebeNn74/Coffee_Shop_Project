import express from 'express';
// import orderRouter from './infrastructure/api/order.router';

const app = express();
app.use(express.json());

// app.use('/order', orderRouter);

export default app;