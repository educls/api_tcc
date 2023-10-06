const express = require('express');
const bodyParser = require('body-parser')
const server = express();

server.use(express.json());

server.use('/usuarios', require('./src/routes/usuario_routes'))


server.listen(3000, () =>{
    console.log('Servidor está funcionando...')
})

