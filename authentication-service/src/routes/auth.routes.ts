import { Router } from 'express';
import { verifyToken } from '../utils/jwt';  
import { AuthController } from '../controllers/auth.controller';

// Explicitly type the router  
const router: Router = Router(); 
const authController= new AuthController();

// Public routes  
router.post('/register', authController.registerUser);  
router.post('/login', authController.loginUser);
// Protected routes  
router.get('/protected', verifyToken, (req, res) => {  
    res.json({ message: 'This is a protected route' });  
});  

export default router;