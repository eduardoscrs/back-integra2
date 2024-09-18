const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casoController');

router.post('/', createCaso);

module.exports = router;
