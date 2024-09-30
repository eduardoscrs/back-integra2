import express from 'express';
import { getRol, registerRol } from '../controllers/rolController.js';

const router = express.Router();

router.post('/', registerRol);
router.get('/', getRol);

export default router;
