import Stripe from 'stripe';
import { env } from '../config/environment';
import { logger } from '../utils/logger';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export async function createCheckoutSession(amount: number, successUrl: string, cancelUrl: string): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Appointment',
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  logger.info(`CheckoutSession created: ${session.id}`);
  return session.url!;
}
