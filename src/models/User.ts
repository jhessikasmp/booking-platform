import { pool } from '../config/database';
import { logger } from '../utils/logger';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  phone?: string;
  role: 'client' | 'professional';
  created_at: Date;
}

export class User {
  static async create(data: Omit<IUser,'id'|'created_at'>): Promise<IUser> {
    const { name, email, password_hash, phone, role } = data;
    const res = await pool.query<IUser>(
      `INSERT INTO users (name,email,password_hash,phone,role)
       VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [name,email,password_hash,phone,role]
    );
    logger.info(`User created: ${res.rows[0].id}`);
    return res.rows[0];
  }

  static async findByEmail(email: string): Promise<IUser|null> {
    const res = await pool.query<IUser>(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );
    return res.rows[0] || null;
  }

  static async findById(id: number): Promise<IUser|null> {
    const res = await pool.query<IUser>(
      `SELECT id,name,email,phone,role,created_at FROM users WHERE id=$1`,
      [id]
    );
    return res.rows[0] || null;
  }
}
