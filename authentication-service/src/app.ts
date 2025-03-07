import express from 'express';  
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';  
import 'dotenv/config'

const app = express();  

// Middleware  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

// Routes  
app.use('/api/auth', authRouter);  

// MongoDB connection  
mongoose  
    .connect(process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.8nq6xvf.mongodb.net/auth-db')  
    .then(() => console.log('Connected to MongoDB'))  
    .catch((error) => console.error('Error connecting to MongoDB:', error));  

// Start server  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
    console.log(`Server running on port ${PORT}`);  
});