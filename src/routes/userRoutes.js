import express from 'express';
import {
  getUsers,
  registerUser,
  editUser,
} from '../controllers/userController.js';
import { getRol, registerRol } from '../controllers/rolController.js';

const router = express.Router();

// Rutas para usuarios
router.post('/register', registerUser); // Registro de usuario
router.get('/', getUsers); // Obtener usuarios
router.put('/:id', editUser); // Editar usuario por ID

// Rutas para roles
router.post('/roles', registerRol); // Registro de rol
router.get('/roles', getRol); // Obtener roles

export default router;
