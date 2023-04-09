import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getMyOrders, placeholder } from '../controllers/order.js';


const router = express.Router();

router.post('/createuser',placeholder)
router.get('/myorders',isAuthenticated,getMyOrders)

export default router;