import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  const {
    nombre,
    apellido,
    celular,
    correo,
    contrasena,
    direccion,
    comuna,
    ID_rol,
  } = req.body;

  // Verificación de campos obligatorios
  if (
    !nombre ||
    !apellido ||
    !celular ||
    !correo ||
    !contrasena ||
    !direccion ||
    !comuna ||
    !ID_rol
  ) {
    return res.status(400).json({
      message: 'Faltan datos necesarios para crear el usuario.',
    });
  }

  try {
    // Cifrar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const [result] = await pool.query(
      `INSERT INTO Usuario (nombre, apellido, celular, correo, contrasena, direccion, comuna, ID_rol)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        apellido,
        celular,
        correo,
        hashedPassword,
        direccion,
        comuna,
        ID_rol,
      ] // Usa hashedPassword aquí
    );

    const UsuarioID = result.insertId;

    res.status(201).json({ message: 'Usuario creado.', UsuarioID });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM Usuario');

    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const [usuario] = await pool.query(
      `
      SELECT Usuario.*, Rol.nombre_rol 
      FROM Usuario 
      JOIN Rol ON Usuario.ID_rol = Rol.ID_rol
      WHERE Usuario.ID_usuario = ?
    `,
      [id]
    );

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(usuario[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    celular,
    correo,
    contrasena,
    direccion,
    comuna,
    ID_rol,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !celular ||
    !correo ||
    !direccion ||
    !comuna ||
    !ID_rol
  ) {
    return res.status(400).json({
      message: 'Faltan datos necesarios para actualizar el usuario.',
    });
  }

  try {
    // Si se proporciona una nueva contraseña, cifrarla
    let hashedPassword = contrasena;
    if (contrasena) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    }

    const [result] = await pool.query(
      `UPDATE Usuario
       SET nombre = ?, apellido = ?, celular = ?, correo = ?, contrasena = ?, direccion = ?, comuna = ?, ID_rol = ?
       WHERE ID_usuario = ?`,
      [
        nombre,
        apellido,
        celular,
        correo,
        hashedPassword, // Usa la contraseña cifrada
        direccion,
        comuna,
        ID_rol,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario actualizado.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM Usuario WHERE ID_usuario = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario eliminado.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//a
