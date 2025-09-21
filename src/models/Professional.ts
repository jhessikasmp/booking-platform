import { pool } from '../config/database';
import { logger } from '../utils/logger';

export interface IProfessional {
  id: number;
  user_id: number;
  specialty: string;
  description?: string;
  price_per_hour?: number;
  is_active: boolean;
}

export class Professional {
  static async findAll(): Promise<IProfessional[]> {
    const res = await pool.query<IProfessional>(
      `SELECT * FROM professionals WHERE is_active = true`
    );
  logger.info(`Professionals listed: ${res.rowCount}`);
    return res.rows;
  }

  static async create(data: Omit<IProfessional,'id'>): Promise<IProfessional> {
    const { user_id, specialty, description, price_per_hour, is_active } = data;
    const res = await pool.query<IProfessional>(
      `INSERT INTO professionals
       (user_id,specialty,description,price_per_hour,is_active)
       VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [user_id,specialty,description,price_per_hour,is_active]
    );
    logger.info(`Professional created: ${res.rows[0].id}`);
    return res.rows[0];
  }
}
