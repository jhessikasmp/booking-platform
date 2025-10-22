import { Router } from 'express';
import { ProfessionalController } from '../controllers/professionalController';
import { auth } from '../middleware/auth';

const router = Router();
/**
 * @openapi
 * /professionals:
 *   get:
 *     summary: List professionals
 *     tags: [Professionals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of professionals
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, ProfessionalController.list);
/**
 * @openapi
 * /professionals/{id}/availability:
 *   get:
 *     summary: Get professional availability
 *     tags: [Professionals]
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
 *         description: Availability
 *       401:
 *         description: Unauthorized
 */
router.get('/:id/availability', auth, ProfessionalController.getAvailability);
/**
 * @openapi
 * /professionals/{id}/availability:
 *   post:
 *     summary: Set professional availability
 *     tags: [Professionals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ranges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start:
 *                       type: string
 *                       format: date-time
 *                     end:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       200:
 *         description: Availability updated
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/availability', auth, ProfessionalController.setAvailability);

export default router;
