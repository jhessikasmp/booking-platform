import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();
router.get('/me', auth, UserController.profile);

export default router;
