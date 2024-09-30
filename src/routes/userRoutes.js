import express from 'express';
import {
  registerUser,
  getUsers,
  editUser,
  registerRol,
  getRol,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/users', getUsers);
router.put('/edit/:id', editUser);
// Actualizar por rol
router.post('/registerRol', registerRol);
router.get('/rol', getRol);
