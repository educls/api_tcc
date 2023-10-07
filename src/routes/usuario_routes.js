const express = require('express');
const router = express.Router();
const usuario_controller = require('../controllers/usuario_controller');

router.post('/', usuario_controller.post);

router.get('/:id', usuario_controller.get);

router.delete('/:id', usuario_controller.delete);

module.exports = router;