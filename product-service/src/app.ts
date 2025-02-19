import express from 'express';  
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors'; 
import productRoutes from './routes/product.routes';  
import { authenticate } from './middleware/auth';

const app = express();  

// Middleware  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(cors());  

// Secure routes with JWT authentication  
app.use('/api/products', authenticate, productRoutes);  


// MongoDB connection  
mongoose  
    .connect(process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.8nq6xvf.mongodb.net/product')  
    .then(() => console.log('Connected to MongoDB'))  
    .catch((error) => console.error('Error connecting to MongoDB:', error));  

// Start server  
const PORT = process.env.PORT || 3002;  
app.listen(PORT, () => {  
    console.log(`Server running on port ${PORT}`);  
});