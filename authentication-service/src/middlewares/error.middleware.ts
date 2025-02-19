import { Request, Response, NextFunction } from "express";

export const errorHandler=(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    console.error('Error: ',error.stack);
    
    if (error.name === 'ValidationError') {  
        return res.status(400).json({  
            message: 'Validation Error',  
            details: error.message  
        });  
    }  

    if (error.name === 'CastError') {  
        return res.status(400).json({  
            message: 'Invalid ID format'  
        });  
    }  

    res.status(500).json({  
        message: 'Something went wrong on the server'  
    });  
}