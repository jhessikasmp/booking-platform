import nodemailer from 'nodemailer';
import { generateICS } from './calendarService';
import { env } from '../config/environment';
import { logger } from '../utils/logger';
import { IAppointment } from '../models/Appointment';
import { Professional } from '../models/Professional';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
});

export async function sendConfirmation(appt: IAppointment): Promise<void> {
  try {
    const icsContent = generateICS(appt);
  let professionalInfo = '';
    try {
      const prof = await Professional.findAll();
      const professional = prof.find(p => p.id === appt.professional_id);
      if (professional) {
        professionalInfo = `- Professional: ${professional.specialty}`;
      }
    } catch {
      logger.warn(`Could not fetch professional info for appointment ${appt.id}`); 
    }

    await transporter.sendMail({
      from: `Appointments <${env.SMTP_USER}>`,
      to: appt.client_email,
      subject: 'Appointment Confirmation',
      text:
        `Hello!\n\nYour appointment has been successfully confirmed.\n\n` +
        `Appointment details:\n` +
        `- ID: ${appt.id}\n` +
        `- Service: ${appt.service}\n` +
        (professionalInfo ? professionalInfo + '\n' : '') +
        `- Date/Time: ${appt.date.toISOString()}\n` +
        `- Duration: ${appt.duration} minutes\n` +
        `- Status: ${appt.status === 'scheduled' ? 'Scheduled' : 'Cancelled'}\n` +
        `\nIf you want to add this to your calendar, use the attached .ics file.\n` +
        `If you need to cancel or change it, please contact us.\n\nThanks for booking with us!`,
      attachments: [
        {
          filename: `appointment-${appt.id}.ics`,
          content: icsContent,
          contentType: 'text/calendar'
        }
      ]
    });
    logger.info(`Confirmation email sent to ${appt.client_email}`);
  } catch (err: any) {
    logger.error(`Nodemailer error: ${err.message}`);
  }
}
