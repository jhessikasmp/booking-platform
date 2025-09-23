import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();
/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Retorna perfil do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */
router.get('/me', auth, UserController.profile);

export default router;
