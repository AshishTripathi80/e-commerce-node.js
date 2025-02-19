import mongoose, { Schema, Document } from 'mongoose';  
import bcrypt from 'bcryptjs';  

// Define user interface  
export interface User extends Document {  
    name: string;  
    email: string;  
    password: string;  
    role: "user" | "admin";  
    comparePassword(password: string): Promise<boolean>;  
    createdAt: Date;  
}  

// Define user schema  
const UserSchema = new Schema({  
    name: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },  
    role: { type: String, default: "user" },  
    createdAt: { type: Date, default: Date.now }  
}, {  
    collection: 'users'  
});  

// Method to compare password  
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {  
    const user = this as User;  
    return bcrypt.compare(password, user.password);  
};  

// Pre-save hook for password hashing  
UserSchema.pre('save', async function (this: User, next) {  
    if (this.isModified('password')) {  
        const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security  
        this.password = await bcrypt.hash(this.password, salt);  
    }  
    next();  
});  

// Create model  
const UserModel = mongoose.model<User>('User', UserSchema);  

export { UserSchema, UserModel as User };