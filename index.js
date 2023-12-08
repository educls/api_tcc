const express = require('express');
const bodyParser = require('body-parser')
const server = express();

server.use(express.json());

server.use('/usuarios', require('./src/routes/usuario_routes'))

server.use('/login', require('./src/routes/login_routes'))

server.use('/login-medico', require('./src/routes/login_medico_routes'))

server.use('/medicos', require('./src/routes/medico_routes'))

server.use('/consulta-agendar', require('./src/routes/consulta_routes'))

server.use('/atestado-gerar', require('./src/routes/atestado_routes'))

server.listen(3000, () =>{
    console.log('Servidor está funcionando...')
})

