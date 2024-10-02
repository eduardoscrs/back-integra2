import express from 'express';
import {
  createUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { loginUser } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.post('/login', loginUser);

export default router;
