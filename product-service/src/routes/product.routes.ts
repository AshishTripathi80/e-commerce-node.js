import { Router } from "express";
import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct, } from "../controllers/product.controle";

const router=Router();

router.post('/',createProduct);
router.get('/',getAllProducts);
router.get('/:productId', getProductById);  
router.put('/:productId', updateProduct);  
router.delete('/:productId', deleteProduct);

export default router; 