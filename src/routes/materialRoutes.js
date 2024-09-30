import express from 'express';
import {
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} from '../controllers/materialController.js';

const router = express.Router();

router.post('/', createMaterial);
router.get('/', getMaterial);
// Actualizar un material específico
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;
