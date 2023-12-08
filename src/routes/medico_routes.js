const express = require('express');
const router = express.Router();
const medicos_controller = require('../controllers/medicos_controller');
const auth_verify =  require('../middleware/auth_verify')

router.post('/', medicos_controller.post);

router.get('/get_info', auth_verify, medicos_controller.get);

router.get('/get_whole_infos', medicos_controller.get);

router.delete('/delete', auth_verify, medicos_controller.delete);

module.exports = router;