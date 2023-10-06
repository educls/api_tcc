const mysql = require('mysql2/promise');

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
    const username = usuario.username
    const email = usuario.email
    const password = usuario.password

    if (username === undefined || email === undefined || password === undefined) {
        console.log(username, email, password)
        throw new Error("Um ou mais campos obrigatorios estao nulos");
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication',
    });
    let sqlCommand = 'insert into usuarios (username, email, password) values (?, ?, ?)'

    const [resultado] = await connection.execute(sqlCommand, [username, email, password]);

    if(resultado.affectedRows > 0){
        return true
    }else {
        return false
    }
}