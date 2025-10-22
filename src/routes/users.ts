import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();
/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get('/me', auth, UserController.profile);

export default router;
