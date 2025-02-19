// src/utils/db.ts  
import mongoose from 'mongoose';  

const connectDB = async () => {  
    const MongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Fallback to local MongoDB  
    
    try {  
        await mongoose.connect(MongoDBURI);  
        console.log('Connected to MongoDB');  
    } catch (error) {  
        console.error('Error connecting to MongoDB:', error);  
        process.exit(1);  
    }  
};  

export default connectDB;