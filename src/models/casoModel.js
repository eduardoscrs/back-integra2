const db = require('../config/database');

class Caso {
  static async crear(casoData) {
    const [result] = await db.query(
      'INSERT INTO Caso (tipo_siniestro, descripcion_siniestro, ID_Cliente, ID_inspector, ID_contratista) VALUES (?, ?, ?, ?, ?)',
      [
        casoData.tipo_siniestro,
        casoData.descripcion_siniestro,
        casoData.ID_Cliente,
        casoData.ID_inspector,
        casoData.ID_contratista,
      ]
    );
    return result.insertId;
  }

  static async obtenerPorId(id) {
    const [rows] = await db.query('SELECT * FROM Caso WHERE ID_caso = ?', [id]);
    return rows[0];
  }
}

module.exports = Caso;
