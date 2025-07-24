import { Router } from 'express';
import { signInWithEmail, createProfile,updateProfile } from '../controllers/userController'; // Ensure correct import path

const router = Router();

router.post('/signin', signInWithEmail);
router.post('/profile', createProfile);
router.put('/update-profile', updateProfile);

export default router;
