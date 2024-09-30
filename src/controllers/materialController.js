import { pool } from '../config/db.js';

export const createMaterial = async (req, res) => {
  const { nombre_material, cantidad, precio, medida } = req.body;

  // Validación de los datos necesarios
  let missingFields = [];

  if (!nombre_material) missingFields.push('nombre_material');
  if (!cantidad) missingFields.push('cantidad');
  if (!precio) missingFields.push('precio');
  if (!medida) missingFields.push('medida');

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan los siguientes datos necesarios para crear el material: ${missingFields.join(
        ', '
      )}.`,
    });
  }

  try {
    // Inserción del material en la base de datos
    const [result] = await pool.query(
      `INSERT INTO Material (nombre_material, cantidad, precio, medida)
       VALUES (?, ?, ?, ?)`,
      [nombre_material, cantidad, precio, medida]
    );

    const MaterialID = result.insertId;

    res.status(201).json({ message: 'Material creado.', MaterialID });
  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ message: error.message });
  }
};

export const getMaterial = async (req, res) => {
  try {
    // Obtener todos los materiales
    const [materiales] = await pool.query('SELECT * FROM Material');

    res.status(200).json(materiales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMaterialByID = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener material por ID
    const [material] = await pool.query(
      'SELECT * FROM Material WHERE ID_material = ?',
      [id]
    );

    if (material.length === 0) {
      return res.status(404).json({ message: 'Material no encontrado.' });
    }

    res.status(200).json(material[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { nombre_material, cantidad, precio, medida } = req.body;

  if (!nombre_material || !cantidad || !precio || !medida) {
    return res.status(400).json({
      message: 'Faltan datos necesarios para actualizar el material.',
    });
  }

  try {
    // Actualizar material
    const [result] = await pool.query(
      `UPDATE Material SET nombre_material = ?, cantidad = ?, precio = ?, medida = ? WHERE ID_material = ?`,
      [nombre_material, cantidad, precio, medida, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Material no encontrado.' });
    }

    res.status(200).json({ message: 'Material actualizado.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar material
    const [result] = await pool.query(
      'DELETE FROM Material WHERE ID_material = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Material no encontrado.' });
    }

    res.status(200).json({ message: 'Material eliminado.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMaterialCantidad = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  if (!cantidad) {
    return res.status(400).json({
      message: 'Falta la cantidad para actualizar el material.',
    });
  }

  try {
    // Actualizar cantidad de material
    const [result] = await pool.query(
      `UPDATE Material SET cantidad = ? WHERE ID_material = ?`,
      [cantidad, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Material no encontrado.' });
    }

    res.status(200).json({ message: 'Cantidad de material actualizada.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
