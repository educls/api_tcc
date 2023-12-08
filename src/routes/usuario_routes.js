const express = require('express');
const router = express.Router();
const usuario_controller = require('../controllers/usuario_controller');
const auth_verify = require('../middleware/auth_verify')

router.post('/', usuario_controller.post);

router.get('/get_info', auth_verify, usuario_controller.get);

router.get('/:id', usuario_controller.get);

router.delete('/delete', auth_verify, usuario_controller.delete);

module.exports = router;