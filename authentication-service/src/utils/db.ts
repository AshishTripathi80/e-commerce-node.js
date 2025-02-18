import mongoose from "mongoose";

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
    }catch(error){
        console.log('error while connecting with mongodb',error);
        process.exit(1);
    }
};

export default connectDb;