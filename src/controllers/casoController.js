import { pool } from '../config/db.js';

export const createCaso = async (req, res) => {
  const {
    tipo_siniestro,
    descripcion_siniestro,
    ID_Cliente,
    ID_inspector,
    ID_contratista,
    ID_estado,
    sectores,
  } = req.body;

  if (
    !tipo_siniestro ||
    !descripcion_siniestro ||
    !ID_Cliente ||
    !ID_inspector ||
    !ID_contratista ||
    !ID_estado ||
    !sectores
  ) {
    return res
      .status(400)
      .json({ message: 'Faltan datos necesarios para crear el caso.' });
  }

  try {
    // Se agrega el caso a la tabla Caso
    const [result] = await pool.query(
      `INSERT INTO Caso (tipo_siniestro, descripcion_siniestro, ID_Cliente, ID_inspector, ID_contratista, ID_estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        tipo_siniestro,
        descripcion_siniestro,
        ID_Cliente,
        ID_inspector,
        ID_contratista,
        ID_estado,
      ]
    );

    // ID del caso insertado
    const casoID = result.insertId;

    // Agregar a la tabla Sector
    for (const sector of sectores) {
      await pool.query(
        `INSERT INTO Sector (nombre_sector, dano_sector, porcentaje_perdida, total_costo, ID_caso)
         VALUES (?, ?, ?, ?, ?)`,
        [
          sector.nombre_sector,
          sector.dano_sector,
          sector.porcentaje_perdida,
          sector.total_costo,
          casoID,
        ]
      );
    }

    res.status(201).json({ message: 'Caso creado exitosamente', casoID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el caso', error });
  }
};

export const getCasos = async (req, res) => {
  try {
    const [casos] = await pool.query(`
      SELECT Caso.*, Estado_Caso.nombre_estado 
      FROM Caso 
      JOIN Estado_Caso ON Caso.ID_estado = Estado_Caso.ID_estado
    `);

    // Utilizar un enfoque secuencial o con un límite de concurrencia
    const casosConSectores = [];

    for (const caso of casos) {
      const [sectores] = await pool.query(
        `SELECT * FROM Sector WHERE ID_caso = ?`,
        [caso.ID_caso]
      );
      casosConSectores.push({ ...caso, sectores });
    }

    res.status(200).json(casosConSectores);
  } catch (error) {
    console.error(error); // Loguea el error para depuración
    res.status(500).json({ message: 'Error al obtener los casos', error });
  }
};

//actualizar caso
export const updateCaso = async (req, res) => {
  const casoID = req.params.id; // Obtén el ID del caso desde la ruta
  const {
    tipo_siniestro,
    descripcion_siniestro,
    ID_Cliente,
    ID_inspector,
    ID_contratista,
    ID_estado,
  } = req.body;

  // Verificar que los campos requeridos no sean null
  if (
    tipo_siniestro == null ||
    descripcion_siniestro == null ||
    ID_Cliente == null ||
    ID_inspector == null ||
    ID_contratista == null ||
    ID_estado == null
  ) {
    return res.status(400).json({
      message: 'Todos los campos son obligatorios y no deben ser null',
    });
  }
  try {
    // Actualizar el caso
    await pool.query(
      `UPDATE Caso SET tipo_siniestro = ?, descripcion_siniestro = ?, ID_Cliente = ?, ID_inspector = ?, ID_contratista = ?, ID_estado = ? WHERE ID_caso = ?`,
      [
        tipo_siniestro,
        descripcion_siniestro,
        ID_Cliente,
        ID_inspector,
        ID_contratista,
        ID_estado,
        casoID,
      ]
    );

    res.status(200).json({ message: 'Caso actualizado exitosamente' });
  } catch (error) {
    console.error(error); // Loguea el error para depuración
    res.status(500).json({ message: 'Error al actualizar el caso', error });
  }
};

export const deleteCaso = async (req, res) => {
  const casoID = req.params.id;

  try {
    // Verificar si el caso existe
    const [caso] = await pool.query('SELECT * FROM Caso WHERE ID_caso = ?', [casoID]);
    if (caso.length === 0) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }

    // Eliminar los sectores asociados primero
    await pool.query(`DELETE FROM Sector WHERE ID_caso = ?`, [casoID]);

    // Luego eliminar el caso
    await pool.query(`DELETE FROM Caso WHERE ID_caso = ?`, [casoID]);

    res.status(200).json({ message: 'Caso eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el caso', error });
  }
};


export const getCasoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Caso WHERE ID_caso = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener el caso:', err.message);
    res.status(500).json({ message: 'Error al obtener el caso' });
  }
};


export const actualizarEstadoCaso = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Caso SET ID_estado = ? WHERE ID_caso = ?`,
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Caso no encontrado' });
    }

    res.status(200).json({ mensaje: 'Estado del caso actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado del caso', error });
  }
};