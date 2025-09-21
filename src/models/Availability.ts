import { pool } from '../config/database';
import { logger } from '../utils/logger';

export interface IAvailability {
  id: number;
  professional_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export class Availability {
  static async create(data: Omit<IAvailability, 'id'>): Promise<IAvailability> {
    const { professional_id, day_of_week, start_time, end_time, is_available } = data;
    const res = await pool.query<IAvailability>(
      `INSERT INTO availability (professional_id, day_of_week, start_time, end_time, is_available)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [professional_id, day_of_week, start_time, end_time, is_available]
    );
  logger.info(`Availability created: ${res.rows[0].id}`);
    return res.rows[0];
  }

  static async findByProfessional(professionalId: number): Promise<IAvailability[]> {
    const res = await pool.query<IAvailability>(
      `SELECT * FROM availability WHERE professional_id = $1 AND is_available = true ORDER BY day_of_week, start_time`,
      [professionalId]
    );
    return res.rows;
  }

  static async update(id: number, data: Partial<Omit<IAvailability, 'id'>>): Promise<IAvailability | null> {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

    const res = await pool.query<IAvailability>(
      `UPDATE availability SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );

    if (res.rows[0]) {
  logger.info(`Availability updated: ${id}`);
    }
    return res.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const res = await pool.query(`DELETE FROM availability WHERE id = $1`, [id]);
    const deleted = (res.rowCount ?? 0) > 0;
    if (deleted) {
      logger.info(`Availability removed: ${id}`);
    }
    return deleted;
  }
}
