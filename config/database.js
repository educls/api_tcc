const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aplication',
});

connection.connect((err) => {
    if(err) {
        console.log('Erro ao conectar ao Banco', err)
        return;
    }else {
        console.log('Conexao bem sucedida')
    }
})

module.exports = connection