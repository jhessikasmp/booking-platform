import { Request,Response } from 'express';
import { AuthReq } from '../middleware/auth';
import { Appointment } from '../models/Appointment';
import { sendConfirmation } from '../services/emailService';
import { createEvent } from '../services/calendarService';
import { logger } from '../utils/logger';

export class AppointmentController {
  static async create(req: Request, res: Response) {
    try {
      const { client_email,professional_id,date,duration,service } = req.body;
      const apptDate = new Date(date);

      if (await Appointment.findConflict(professional_id,apptDate)) {
        return res.status(400).json({ error:'Time slot unavailable' });
      }

      const appt = await Appointment.create({
        client_email,professional_id,date:apptDate,duration,service
      });

  await sendConfirmation(appt);
      await createEvent(appt);

      res.status(201).json(appt);
    } catch (err:any) {
      logger.error(`Error creating appointment: ${err.message}`);
      res.status(500).json({ error:'Internal server error' });
    }
  }

  static async myAppointments(req: AuthReq, res: Response) {
    const list = await Appointment.findByUserEmail(req.user!.email);
    res.json(list);
  }

  static async cancel(req: AuthReq, res: Response) {
    try {
      const id = Number(req.params.id);
      await Appointment.cancel(id);
      res.json({ message:'Cancelled' });
    } catch (err:any) {
      logger.error(`Error cancelling appointment: ${err.message}`);
      res.status(500).json({ error:'Internal server error' });
    }
  }
}
