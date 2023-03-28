import express from 'express';
import { createCropController, deleteCropController, getCropDetailsController, getSingleCropController, updateSingleCropController } from '../controllers/cropController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create-crop',requireSignIn,isAdmin,createCropController)
router.get('/get-crops',getCropDetailsController);
router.post('/get-single-crop',getSingleCropController);
router.put('/update-crop',requireSignIn,isAdmin,updateSingleCropController);
router.delete('/delete-crop/:id',requireSignIn,isAdmin,deleteCropController);
export default router;