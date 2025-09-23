import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Usuário registrado
 *       400:
 *         description: Erro de validação
 */
router.post('/register',AuthController.register);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login',AuthController.login);

export default router;
