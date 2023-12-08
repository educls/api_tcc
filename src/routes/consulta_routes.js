const express = require('express');
const router = express.Router();
const consulta_controller = require('../controllers/consulta_controller');
const auth_verify = require('../middleware/auth_verify')

router.post('/', auth_verify, consulta_controller.post)

router.get('/get_info', auth_verify, consulta_controller.get)

router.delete('/:id', auth_verify, consulta_controller.delete)

module.exports = router;