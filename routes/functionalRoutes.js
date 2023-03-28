import express from 'express';
import  { acceptOrderController, fetchAcceptedOrdersController, getAllActiveTransportOrdersController, getTransportOrdersController, transportRequestController } from '../controllers/functionalControllers.js'
import { requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/transport',requireSignIn,transportRequestController)
router.get('/get-orders',requireSignIn,getTransportOrdersController)
router.get('/get-all-active-orders',requireSignIn,getAllActiveTransportOrdersController);
router.put('/accept-order',requireSignIn,acceptOrderController)
router.post('/accepted-orders',fetchAcceptedOrdersController)
export default router;