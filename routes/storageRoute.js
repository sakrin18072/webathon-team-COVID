import express from 'express';
import { acceptStorageController, freeStorage, getAllAvailableStoragesController, getStorageOrdersController } from '../controllers/storageController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/booked-storages',requireSignIn,getStorageOrdersController);
router.get('/available-storages',requireSignIn,getAllAvailableStoragesController);
router.post('/book-storage',requireSignIn,acceptStorageController);
router.put('/giveup-storage',freeStorage);
export default router;