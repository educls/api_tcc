const express = require('express');
const router = express.Router();
const usuario_controller = require('../controllers/usuario_controller');

router.post('/', usuario_controller.post);

module.exports = router;