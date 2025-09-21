import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { env } from '../config/environment';
import { logger } from '../utils/logger';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password, phone, role } = req.body;

    // Basic password validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash: hash, phone, role });
  logger.info(`Register: user ${user.id}`);
    res.status(201).json(user);
  }

  static async login(req: Request, res: Response) {
    const { email,password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !await bcrypt.compare(password,user.password_hash)) {
      logger.warn(`Login failed: ${email}`);
      return res.status(401).json({ error:'Invalid credentials' });
    }
    const token = jwt.sign({ id:user.id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
  logger.info(`Login: user ${user.id}`);
    res.json({ token });
  }
}
