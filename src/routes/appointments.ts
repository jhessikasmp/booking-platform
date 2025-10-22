import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { auth } from '../middleware/auth';
import { validateAppointment } from '../middleware/validation';

const router = Router();

/**
 * @openapi
 * /appointments:
 *   post:
 *     summary: Create an appointment 
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professional_id:
 *                 type: integer
 *               service:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: Appointment created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, validateAppointment, AppointmentController.create);

/**
 * @openapi
 * /appointments/my:
 *   get:
 *     summary: List authenticated user's appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 *       401:
 *         description: Unauthorized
 */
router.get('/my', auth, AppointmentController.myAppointments);

/**
 * @openapi
 * /appointments/{id}/cancel:
 *   put:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Appointment canceled
 *       401:
 *         description: Unauthorized
 */
router.put('/:id/cancel', auth, AppointmentController.cancel);

export default router;
