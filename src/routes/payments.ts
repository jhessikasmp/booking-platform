import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { auth } from '../middleware/auth';

const router = Router();

/**
 * @openapi
 * /payments/create-checkout:
 *   post:
 *     summary: Cria uma sessão de Checkout do Stripe
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 49.9
 *               successUrl:
 *                 type: string
 *                 example: https://seusite.com/sucesso
 *               cancelUrl:
 *                 type: string
 *                 example: https://seusite.com/erro
 *     responses:
 *       200:
 *         description: URL de checkout criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 checkoutUrl:
 *                   type: string
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno
 */
// Create simplified checkout session
router.post('/create-checkout', auth, PaymentController.createCheckout);

export default router;
