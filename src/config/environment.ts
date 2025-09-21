import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const schema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  GOOGLE_SERVICE_ACCOUNT_KEY_PATH: z.string().default('./service-account-key.json'),
});

export const env = schema.parse(process.env);
