import { Request, Response } from 'express';  
import Product from '../models/product.model'; 

//create product
export const createProduct=async (req:Request,res:Response)=>{
    try{
        const product=new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }catch(error){
        res.status(500).json({message:'error creating product',error});
    }
}

//get app product
export const getAllProduct= async(req:Request,res:Response)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products)

    }catch(error){
        res.status(500).json({message:'error fetching product',error});
    }
}

//get product by id
export const getProductById= async(req:Request,res:Response)=>{
    try{
        const productId= req.params;
        const product=await Product.findById(productId);
        if (!product) {  
            res.status(404).json({ message: 'Product not found' });  
            return;  
          }  
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message:'error fetching product',error});
    }
}


// Update Product  
export const updateProduct = async (req: Request, res: Response) => {  
    try {  
      const productId = req.params.productId;  
      const product = await Product.findByIdAndUpdate(  
        productId,  
        req.body,  
        { new: true }  
      );  
      if (!product) {  
        res.status(404).json({ message: 'Product not found' });  
        return;  
      }  
      res.status(200).json({ message: 'Product updated successfully', product });  
    } catch (error) {  
      res.status(500).json({ message: 'Error updating product', error });  
    }  
  };  

  // Delete Product  
export const deleteProduct = async (req: Request, res: Response) => {  
    try {  
      const productId = req.params.productId;  
      const product = await Product.findByIdAndDelete(productId);  
      if (!product) {  
        res.status(404).json({ message: 'Product not found' });  
        return;  
      }  
      res.status(200).json({ message: 'Product deleted successfully' });  
    } catch (error) {  
      res.status(500).json({ message: 'Error deleting product', error });  
    }  
  };  