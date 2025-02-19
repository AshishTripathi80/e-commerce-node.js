import { Request, Response, NextFunction } from "express";  
import { User } from "../models/user.model";  
import { generateToken } from "../utils/jwt";  

export class AuthController {  
    public async registerUser(req: Request, res: Response, next: NextFunction) {  
        try {  
            const { name, email, password } = req.body;  

            // Check if user already exists  
            const existingUser = await User.findOne({ email });  
            if (existingUser) {  
                res.status(400).json({ message: "User already exists" });  
                return;  
            }  

            // Create new user  
            const user = new User({ name, email, password });  

            // Save user to database  
            await user.save();  

            // Generate JWT token  
            const token = generateToken({ userId: user._id });  

            res.status(201).json({ user, token });  
        } catch (error) {  
            next(error);  
        }  
    };  

    public async loginUser(req: Request, res: Response, next: NextFunction) {  
        try {  
            const { email, password } = req.body;  

            // Find user by email  
            const user = await User.findOne({ email });  
            if (!user) {  
                res.status(404).json({ message: "User not found" });  
                return;  
            }  

            // Compare passwords using the method  
            const isMatch = await user.comparePassword(password);  
            if (!isMatch) {  
                res.status(401).json({ message: "Invalid password" });  
                return;  
            }  

            // Generate JWT token  
            const token = generateToken({ userId: user._id });  

            res.json({ user, token });  
        } catch (error) {  
            next(error);  
        }  
    };  
}