import express from 'express';
import {
  createTrabajo,
  getTrabajos,
  updateTrabajo,
  deleteTrabajo,
} from '../controllers/trabajoController.js';

const router = express.Router();

router.post('/', createTrabajo);
router.get('/', getTrabajos);
// Actualizar un trabajo específico
router.put('/:id', updateTrabajo);
router.delete('/:id', deleteTrabajo);

export default router;
