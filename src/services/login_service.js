const mysql = require('mysql2/promise');
const Database = require('../models/Database')
const constants = require('../utils/constants');

exports.verificaSeEmailUsuarioExistente = async (req) => {

    const connection = await mysql.createConnection({
        host: constants.HOST_DB,
        user: constants.DB_USER,
        password: constants.DB_PASSWORD,
        database: constants.DB_DATABASE
    });

    const {email} = req.body;
    let sqlCommand = 'select * from usuarios where email = ? and status = ?'

    const [rows] = await connection.execute(sqlCommand, [email, 'ativo'])
    await connection.end();

    return rows
}