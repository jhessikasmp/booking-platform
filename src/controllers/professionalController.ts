import { Response } from 'express';
import { AuthReq } from '../middleware/auth';
import { Professional } from '../models/Professional';
import { Availability } from '../models/Availability';
import { logger } from '../utils/logger';

export class ProfessionalController {
  static async list(req: AuthReq, res: Response) {
    const pros = await Professional.findAll();
  logger.info(`Professionals listed by user ${req.user?.id}`);
    res.json(pros);
  }

  static async getAvailability(req: AuthReq, res: Response) {
    try {
      const professionalId = Number(req.params.id);
      const availability = await Availability.findByProfessional(professionalId);
      res.json(availability);
    } catch (err: any) {
      logger.error(`Error fetching availability: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async setAvailability(req: AuthReq, res: Response) {
    try {
      const professionalId = Number(req.params.id);
      const { day_of_week, start_time, end_time, is_available } = req.body;

      const availability = await Availability.create({
        professional_id: professionalId,
        day_of_week,
        start_time,
        end_time,
        is_available
      });

      res.status(201).json(availability);
    } catch (err: any) {
      logger.error(`Error setting availability: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
