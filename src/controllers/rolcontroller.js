import { pool } from '../config/db.js';

export const getRol = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const roles = await conn.query('SELECT * FROM ROLES');
    res.json(roles[0]);
  } catch (error) {
    console.log('algo salio mal');
    res.status(500).json({ error: error.message });
  }
};

export const registerRol = async (req, res) => {
  try {
    const {
      nombre,
      puede_editar_precios,
      puede_ver_casos,
      puede_generar_excel,
      puede_generar_informe_pdf,
    } = req.body;
    const newRole = {
      nombre,
      puede_editar_precios,
      puede_ver_casos,
      puede_generar_excel,
      puede_generar_informe_pdf,
    };
    const conn = await pool.getConnection();
    conn.query('INSERT INTO ROLES SET ?', [newRole]);
    res.json(newRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
