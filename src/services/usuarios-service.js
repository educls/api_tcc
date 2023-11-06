const mysql = require('mysql2/promise');
require('dotenv').config();
const host = process.env.DB_HOST

exports.verificaSeEmailUsuarioExistente = async (req) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication1.3',
    });

    const {Email} = req.body;
    let sqlCommand = 'select * from usuarios where Email = ?'

    const [rows] = await connection.execute(sqlCommand, [Email])
    await connection.end();

    return rows
}

exports.cadastraUsuario = async (usuario) => {
    const Nome = usuario.Nome
    const Email = usuario.Email
    const Senha = usuario.Senha
    const CPF = usuario.CPF
    const Telefone = usuario.Telefone
    const Endereco = usuario.Endereco

    if (Endereco === undefined || Nome === undefined || CPF === undefined) {
        throw new Error("Um ou mais campos obrigatorios estao nulos");
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication1.3',
    });

    let sqlCommand = 'insert into usuarios (nome, email, senha, cpf, telefone, status) values (?, ?, ?, ?, ?, ?)'

    const [resultado] = await connection.execute(sqlCommand, [Nome, Email, Senha, CPF, Telefone, "ativo"]);
    const idPacienteInserido = resultado.insertId;
    console.log(idPacienteInserido)

    sqlCommand = 'insert into enderecos (Bairro, Rua, Numero, ID_Paciente) values (?, ?, ?, ?)'

    const [resultadoEndereco] = await connection.execute(sqlCommand, [Endereco.bairro, Endereco.rua, Endereco.numero, idPacienteInserido])

    if(resultado.affectedRows > 0 || resultadoEndereco.affectedRows > 0){
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
        database: 'aplication1.3',
    });

    let sqlCommand = 'select * from usuarios where ID_Paciente = ? and Status = ?'

    const [rows] = await connection.execute(sqlCommand, [id, 'ativo'])
    await connection.end();

    return rows
}

exports.deletaUsuario = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'aplication1.3',
    });

    let sqlCommand = 'update usuarios set Status = ? where ID_Paciente = ?'

    const [rows] = await connection.execute(sqlCommand, ['inativo',id])
    await connection.end();

    return rows
}