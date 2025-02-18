import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is requied"],
    trim: true,
    maxLength: [50, "name can not exceed 50 characters"],
  },

  email:{
    type:String,
    required: [true, "Email is requied"],
    unique:true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']  
  },

  password:{
    type:String,
    required:[true,'Password is required'],
    minLength:[5,'Password must be altleast 5 characters'],
    private:true
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

// pre save hook for password hashing

userSchema.pre('save',async function (next) {
    const salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();    
});

// method to compare passwords
userSchema.methods.comparePassword= async function (candidatePassword:string) {
    return await bcrypt.compare(candidatePassword,this.password);
}

export const User =mongoose.model('User',userSchema);
