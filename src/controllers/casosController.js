const Caso = require('../models/casoModel');

exports.crearCaso = async (req, res) => {
  try {
    const {
      tipo_siniestro,
      descripcion_siniestro,
      ID_Cliente,
      ID_inspector,
      ID_contratista,
    } = req.body;

    const nuevoCasoId = await Caso.crear({
      tipo_siniestro,
      descripcion_siniestro,
      ID_Cliente,
      ID_inspector,
      ID_contratista,
    });

    const nuevoCaso = await Caso.obtenerPorId(nuevoCasoId);

    res.status(201).json({
      success: true,
      data: nuevoCaso,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
