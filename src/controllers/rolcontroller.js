import { pool } from '../config/db.js';

// Obtener todos los roles
export const getRol = async (req, res) => {
  try {
    const conn = await pool.getConnection();

    const roles = await conn.query('SELECT * FROM Rol');
    res.json(roles[0]);
  } catch (error) {
    console.log('Algo salió mal');
    res.status(500).json({ error: error.message });
  }
};

// Registrar un nuevo rol
export const registerRol = async (req, res) => {
  try {
    const {
      nombre_rol,
      puede_editar_precios,
      puede_ver_casos,
      puede_generar_excel,
      puede_generar_informe_pdf,
    } = req.body;

    // Crea un objeto con los datos que vas a insertar
    const newRole = {
      nombre_rol,
      puede_editar_precios,
      puede_ver_casos,
      puede_generar_excel,
      puede_generar_informe_pdf,
    };

    const conn = await pool.getConnection();

    await conn.query('INSERT INTO Rol SET ?', [newRole]);
    res.json(newRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
