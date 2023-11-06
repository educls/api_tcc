const mysql = require('mysql2/promise');
const Database = require('../models/Database')

exports.verificaSeEmailUsuarioExistente = async (req) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication',
    });

    const {email} = req.body;
    let sqlCommand = 'select * from usuarios where email = ? and status = ?'

    const [rows] = await connection.execute(sqlCommand, [email, 'ativo'])
    await connection.end();

    return rows
}