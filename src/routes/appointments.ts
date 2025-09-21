import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { auth } from '../middleware/auth';
import { validateAppointment } from '../middleware/validation';

const router = Router();

router.post(
  '/', 
  auth, 
  validateAppointment, 
  AppointmentController.create
);

router.get(
  '/my', 
  auth, 
  AppointmentController.myAppointments
);

router.put(
  '/:id/cancel', 
  auth, 
  AppointmentController.cancel
);

export default router;
