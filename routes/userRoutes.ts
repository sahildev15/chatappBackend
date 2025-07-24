import { Router } from 'express';
import { signInWithEmail, createProfile } from '../controllers/userController'; // Ensure correct import path

const router = Router();

router.post('/signin', signInWithEmail);
router.post('/profile', createProfile);

export default router;
