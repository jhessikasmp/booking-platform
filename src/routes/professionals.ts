import { Router } from 'express';
import { ProfessionalController } from '../controllers/professionalController';
import { auth } from '../middleware/auth';

const router = Router();
/**
 * @openapi
 * /professionals:
 *   get:
 *     summary: Lista profissionais
 *     tags: [Professionals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profissionais
 *       401:
 *         description: Não autorizado
 */
router.get('/', auth, ProfessionalController.list);
/**
 * @openapi
 * /professionals/{id}/availability:
 *   get:
 *     summary: Consulta disponibilidade do profissional
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
 *         description: Disponibilidade
 *       401:
 *         description: Não autorizado
 */
router.get('/:id/availability', auth, ProfessionalController.getAvailability);
/**
 * @openapi
 * /professionals/{id}/availability:
 *   post:
 *     summary: Define disponibilidade do profissional
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
 *         description: Disponibilidade atualizada
 *       401:
 *         description: Não autorizado
 */
router.post('/:id/availability', auth, ProfessionalController.setAvailability);

export default router;
