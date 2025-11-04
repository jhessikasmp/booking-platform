function pad(n: number): string {
  return n < 10 ? '0' + n : n.toString();
}

function formatDateICS(date: Date): string {
  return date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) + 'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) + 'Z';
}

export function generateICS(appt: IAppointment): string {
  return `BEGIN:VCALENDAR
  \nVERSION:2.0
  \nBEGIN:VEVENT
  \nSUMMARY:${appt.service}
  \nDTSTART:${formatDateICS(appt.date)}
  \nDTEND:${formatDateICS(new Date(appt.date.getTime() + appt.duration * 60000))}
  \nDESCRIPTION:Appointment with ${appt.client_email}
  \nEND:VEVENT
  \nEND:VCALENDAR`;
}
import { IAppointment } from '../models/Appointment';
import { logger } from '../utils/logger';

export async function createEvent(appt: IAppointment): Promise<void> {
  logger.info(`(Simulation) Calendar event created for appointment ${appt.id}`);
}
