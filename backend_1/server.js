// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import productsRoutes from './routes/productRoutes.js';
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/products', productsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
