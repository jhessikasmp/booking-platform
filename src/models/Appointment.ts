import { pool } from '../config/database';
import { logger } from '../utils/logger';

export interface IAppointment {
  id: number;
  client_email: string;
  professional_id: number;
  date: Date;
  duration: number;
  service: string;
  status: 'scheduled'|'cancelled';
  created_at: Date;
}

export class Appointment {
  static async create(data: Omit<IAppointment,'id'|'status'|'created_at'>): Promise<IAppointment> {
    const { client_email, professional_id, date, duration, service } = data;
    const res = await pool.query<IAppointment>(
      `INSERT INTO appointments
       (client_email,professional_id,date,duration,service,status)
       VALUES($1,$2,$3,$4,$5,'scheduled') RETURNING *`,
      [client_email,professional_id,date,duration,service]
    );
    logger.info(`Appointment created: ${res.rows[0].id}`);
    return res.rows[0];
  }

  static async findConflict(professional_id: number, date: Date): Promise<boolean> {
    // Check if there is an appointment at the same time
    const res = await pool.query(
      `SELECT 1 FROM appointments
       WHERE professional_id=$1 AND date=$2 AND status='scheduled'`,
      [professional_id, date]
    );

    if ((res.rowCount ?? 0) > 0) {
      logger.warn(`Scheduling conflict for professional ${professional_id} at ${date}`);
      return true;
    }

    // Check if the professional is available on this day/time
    const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, etc.
    const timeString = date.toTimeString().substring(0, 5); // HH:MM format

    const availRes = await pool.query(
      `SELECT 1 FROM availability
       WHERE professional_id=$1 AND day_of_week=$2 AND is_available=true
       AND start_time <= $3 AND end_time >= $3`,
      [professional_id, dayOfWeek, timeString]
    );

    const available = (availRes.rowCount ?? 0) > 0;
    if (!available) {
      logger.warn(`Professional ${professional_id} not available at ${date}`);
    }

    return !available;
  }

  static async findByUserEmail(email: string): Promise<IAppointment[]> {
    const res = await pool.query<IAppointment>(
      `SELECT * FROM appointments WHERE client_email=$1 ORDER BY date DESC`,
      [email]
    );
    logger.info(`Appointments returned for ${email}: ${res.rowCount}`);
    return res.rows;
  }

  static async cancel(id: number): Promise<void> {
    await pool.query(`UPDATE appointments SET status='cancelled' WHERE id=$1`,[id]);
    logger.info(`Appointment cancelled: ${id}`);
  }
}
