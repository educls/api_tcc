const mysql = require('mysql2/promise');
require('dotenv').config();
const host = process.env.DB_HOST

exports.verificaSeEmailUsuarioExistente = async (req) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication',
      });

    const {email} = req.body;
    let sqlCommand = 'select * from usuarios where email = ?'

    const [rows] = await connection.execute(sqlCommand, [email])
    await connection.end();

    return rows
}

exports.cadastraUsuario = async (usuario) => {
    const id_usuario = usuario.id_usuario
    const username = usuario.username
    const email = usuario.email
    const password = usuario.password

    if (username === undefined || email === undefined || password === undefined) {
        throw new Error("Um ou mais campos obrigatorios estao nulos");
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication',
    });
    let sqlCommand = 'insert into usuarios (id_usuario, username, email, password) values (?, ?, ?, ?)'

    const [resultado] = await connection.execute(sqlCommand, [id_usuario, username, email, password]);

    if(resultado.affectedRows > 0){
        return true
    }else {
        return false
    }
}

exports.listaUsuario = async (id) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication',
    });

    let sqlCommand = 'select * from usuarios where id_usuario = ? and status = ?'

    const [rows] = await connection.execute(sqlCommand, [id, 'ativo'])
    await connection.end();

    return rows
}

exports.deletaUsuario = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication',
    });

    let sqlCommand = 'update usuarios set status = ? where id_usuario = ?'

    const [rows] = await connection.execute(sqlCommand, ['inativo',id])
    await connection.end();

    return rows
}