import { pool } from '../config/db.js';

export const createCaso = async (req, res) => {
  const {
    tipo_siniestro,
    descripcion_siniestro,
    ID_Cliente,
    ID_inspector,
    ID_contratista,
    sectores,
  } = req.body;

  try {
    // Se agrega el caso a la tabla Caso
    const [result] = await pool.query(
      `INSERT INTO Caso (tipo_siniestro, descripcion_siniestro, ID_Cliente, ID_inspector, ID_contratista)
       VALUES (?, ?, ?, ?, ?)`,
      [
        tipo_siniestro,
        descripcion_siniestro,
        ID_Cliente,
        ID_inspector,
        ID_contratista,
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
    res.status(500).json({ message: 'Error al crear el caso', error });
  }
};

export const getCasos = async (req, res) => {
  try {
    const [casos] = await pool.query(`SELECT * FROM Caso`);

    res.status(200).json(casos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los casos', error });
  }
};
