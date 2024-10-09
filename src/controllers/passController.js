import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator'; // Asegúrate de instalar esta biblioteca

export const loginUser = async (req, res) => {
  // Validación de entradas
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE correo = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.ID_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
