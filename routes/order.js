import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { placeholder } from '../controllers/order.js';


const router = express.Router();

router.post('/createuser',isAuthenticated,placeholder)

export default router;