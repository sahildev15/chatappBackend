import { Router } from 'express';
import { signInWithEmail, verifyOtpAndCheckProfile,updateProfile } from '../controllers/userController'; // Ensure correct import path
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/signin', signInWithEmail);
router.post('/profile', verifyOtpAndCheckProfile);
router.put('/update-profile',authenticateToken , updateProfile, );

export default router;
