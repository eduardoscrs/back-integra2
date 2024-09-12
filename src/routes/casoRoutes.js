const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');

router.post('/casos', casoController.crearCaso);

module.exports = router;
