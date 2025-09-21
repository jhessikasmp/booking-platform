import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { auth } from '../middleware/auth';

const router = Router();

// Create simplified checkout session
router.post('/create-checkout', auth, PaymentController.createCheckout);

export default router;
