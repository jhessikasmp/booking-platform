import { Request, Response } from 'express';
import { createPaymentIntent, createCheckoutSession } from '../services/paymentService';
import { logger } from '../utils/logger';

export class PaymentController {
  static async createCheckout(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
      }
      const successUrl = req.body.successUrl;
      const cancelUrl = req.body.cancelUrl;
      const checkoutUrl = await createCheckoutSession(amount, successUrl, cancelUrl);
      
      res.json({ checkoutUrl });
    } catch (error: any) {
      logger.error(`Error creating CheckoutSession: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
