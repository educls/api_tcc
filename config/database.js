const mysql = require('mysql2/promise');
require('dotenv').config();

const bancoDados = mysql.createConnection({
    host: 'localhost:3000',
    user: 'root',
    password: '',
    database: 'aplication',
});

bancoDados.connect((err) => {
    if(err) {
        console.log('Erro ao conectar ao Banco', err)
        return;
    }else {
        console.log('Conexao bem sucedida')
    }
})

module.exports = bancoDados