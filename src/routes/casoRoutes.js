import express from 'express';
import {
  createCaso,
  getCasos,
  updateCaso,
  deleteCaso,
} from '../controllers/casoController.js';

const router = express.Router();

router.post('/', createCaso);
router.get('/', getCasos);
// Actualizar un caso específico
router.put('/:id', updateCaso);
router.delete('/:id', deleteCaso);
router.get('/:id', getCasos);

export default router;
