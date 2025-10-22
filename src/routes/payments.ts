import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { auth } from '../middleware/auth';

const router = Router();

/**
 * @openapi
 * /payments/create-checkout:
 *   post:
 *     summary: Create a Stripe Checkout session
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
 *                 example: https://yourdomain.com/success
 *               cancelUrl:
 *                 type: string
 *                 example: https://yourdomain.com/cancel
 *     responses:
 *       200:
 *         description: Checkout URL created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 checkoutUrl:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
// Create simplified checkout session
router.post('/create-checkout', auth, PaymentController.createCheckout);

export default router;
