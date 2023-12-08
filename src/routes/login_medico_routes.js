const express = require('express');
const router = express.Router();
const login_medico_controller = require('../controllers/login_medico_controller');

router.post('/', login_medico_controller.post);

module.exports = router;