const casoService = require('../services/casoService');

exports.crearCaso = async (req, res) => {
  try {
    const {
      tipo_siniestro,
      descripcion_siniestro,
      ID_Cliente,
      ID_inspector,
      ID_contratista,
    } = req.body;

    const nuevoCaso = await casoService.crearCaso({
      tipo_siniestro,
      descripcion_siniestro,
      ID_Cliente,
      ID_inspector,
      ID_contratista,
    });

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
