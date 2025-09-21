import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

export function validateAppointment(req: Request, res: Response, next: NextFunction) {
  const schema = z.object({
    professional_id: z.number().positive(),
    date: z.string().datetime(),
    duration: z.number().min(15),
    service: z.string().min(1),
    client_email: z.string().email()
  });

  try {
    schema.parse(req.body);
    next();
  } catch (err:any) {
    logger.warn(`Validation failed: ${JSON.stringify(err.errors)}`);
    res.status(400).json({ error:'Invalid data', details: err.errors });
  }
}
