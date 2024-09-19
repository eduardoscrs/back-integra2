import express from 'express';
import { createCaso, getCasos } from '../controllers/casoController.js';

const router = express.Router();

router.post('/', createCaso);
router.get('/', getCasos);

export default router;
