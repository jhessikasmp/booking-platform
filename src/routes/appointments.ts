import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { auth } from '../middleware/auth';
import { validateAppointment } from '../middleware/validation';

const router = Router();

/**
 * @openapi
 * /appointments:
 *   post:
 *     summary: Cria um agendamento
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
 *         description: Agendamento criado
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 */
router.post(
  '/', 
  auth, 
  validateAppointment, 
  AppointmentController.create
);

/**
 * @openapi
 * /appointments/my:
 *   get:
 *     summary: Lista agendamentos do usuário autenticado
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *       401:
 *         description: Não autorizado
 */
router.get(
  '/my', 
  auth, 
  AppointmentController.myAppointments
);

/**
 * @openapi
 * /appointments/{id}/cancel:
 *   put:
 *     summary: Cancela um agendamento
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
 *         description: Agendamento cancelado
 *       401:
 *         description: Não autorizado
 */
router.put(
  '/:id/cancel', 
  auth, 
  AppointmentController.cancel
);

export default router;
