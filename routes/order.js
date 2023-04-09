import express from 'express';
import { autherizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import { getAdminOrders, getMyOrders, getOrderDetails, placeholder, placeholderOnline, processOrders } from '../controllers/order.js';


const router = express.Router();

router.post('/createorder',isAuthenticated,placeholder)
router.post('/createorderonline',placeholderOnline)
router.get('/myorders',isAuthenticated,getMyOrders)
router.get('/order/:id',isAuthenticated,getOrderDetails)

// Add admin middleware
router.get('/admin/orders',isAuthenticated,autherizeAdmin,getAdminOrders)
// to transfer the order status from preparing to shipped and to delivered
router.get('/admin/order/:id',isAuthenticated,autherizeAdmin,processOrders)

export default router;