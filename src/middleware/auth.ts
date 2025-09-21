import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { env } from '../config/environment';
import { logger } from '../utils/logger';

export interface AuthReq extends Request {
  user?: IUser;
}

export async function auth(req: AuthReq, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    logger.warn('Token not provided');
    return res.status(401).json({ error:'Authorization token required' });
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id:number };
    const user = await User.findById(payload.id);
    if (!user) {
      logger.warn(`User not found: ${payload.id}`);
      return res.status(401).json({ error:'Invalid user' });
    }
    req.user = user;
    next();
  } catch (err:any) {
    logger.error(`Invalid token: ${err.message}`);
    res.status(401).json({ error:'Invalid token' });
  }
}
