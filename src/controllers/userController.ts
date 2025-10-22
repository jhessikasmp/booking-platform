import { Response } from 'express';
import { AuthReq } from '../middleware/auth';
import { logger } from '../utils/logger';

export class UserController {
  static profile(req: AuthReq, res: Response) {
    logger.info(`Profile accessed: ${req.user!.id}`);
    res.json(req.user);
  }
}
