import express from 'express';
import { getUsers ,registerUser, editUser } from '../controllers/usercontroller.js';
import { getRol, registerRol } from '../controllers/rolcontroller.js';

const router = express.Router();

router.post('/registerUser', registerUser);
router.get('/getUser', getUsers);
router.post('/registerRol', registerRol)
router.get('/getRol', getRol)
router.put('/editUser', editUser)

export default router;