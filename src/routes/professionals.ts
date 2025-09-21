import { Router } from 'express';
import { ProfessionalController } from '../controllers/professionalController';
import { auth } from '../middleware/auth';

const router = Router();
router.get('/', auth, ProfessionalController.list);
router.get('/:id/availability', auth, ProfessionalController.getAvailability);
router.post('/:id/availability', auth, ProfessionalController.setAvailability);

export default router;
