import { sign, verify } from 'jsonwebtoken'; 
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET=process.env.JWT_SECRET || '8baf1b827db4c993705e9a51d34304a70512bf7786d8cddae4b1c34860789b30f315e87042f17ccabcee3fc648d01ff01d0f6e599f1662f8fcdef11d7de8255277f0e2bf18ee105b2b9fe044dd5b745ba33592270263f4726447a4fd9c1d93663d5aea94219c5b4185f620157d5e3620c9c40800594c530cf3c44147ef736c150aa12ec0d2b74e3c5741dde71194926174d31f2f7fdb44b51b72c556e9fca76e2ef3413e20108cbbae66679b5a701e14491b5d37581d87bde70ae7072cdf06d39d6df13cc04e4c43a6c472e9f6ace35022ba6f5e018ca36d4605559e3a432bc2c62e15e2b367656f2d4ce6facd39f5295f746977fe7a198c2ace188f81b83c18';

export const generateToken =(payload:Object)=>{
    return sign(payload,JWT_SECRET,{expiresIn:'1h'});
}

export const verifyToken= async (req:Request,res:Response,next:NextFunction)=>{
    const token=req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        res.status(401).json({message:'Access Denied'});
        return;
    }
    try{
        const decoded=verify(token,JWT_SECRET);
        req.body=decoded;
        next();
    }catch(error){
         res.status(401).json({message:'Invalid token'})
         return;
    }
}

