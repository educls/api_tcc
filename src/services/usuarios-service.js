
const constants = require('../utils/constants');
const Database = require('../data/database');

const host = process.env.DB_HOST

const db = new Database();

exports.verificaSeEmailUsuarioExistente = async (req) => {

    await db.connect();
    const connection = db.getConnection();

    const {Email} = req.body;

    const [rows] = await db.query(constants.SQL_SELECT_EMAIL, [Email])
    await db.close();

    return rows
}

exports.cadastraUsuario = async (usuario) => {
    const {Nome, Email, Senha, CPF, Telefone, Endereco } = usuario;

    if (Endereco === undefined || Nome === undefined || CPF === undefined) {
        throw new Error(constants.SOME_FIELDS_NULL);
    }

    await db.connect();

    const resultado = await db.query(constants.SQL_INSERT_USERS, [Nome, Email, Senha, CPF, Telefone, "ativo"]);
    const idPacienteInserido = resultado.insertId;
    console.log(idPacienteInserido)

    const resultadoEndereco = await db.query(constants.SQL_INSERT_ADDRESS, [Endereco.estado, Endereco.cidade, Endereco.bairro, Endereco.rua, Endereco.numero, idPacienteInserido])

    if(resultado.affectedRows > 0 || resultadoEndereco.affectedRows > 0){
        return true
    }else {
        return false
    }
}

exports.listaUsuario = async (id) => {

    await db.connect();

    const [rows] = await db.query(constants.SQL_SELECT_ID_PACIENTE, [id, 'ativo'])
    await db.close();

    return rows
}

exports.deletaUsuario = async (id) => {

    await db.connect();

    const rows = await db.query(constants.SQL_DELETE_USERS, ['inativo',id])
    await db.close();

    return rows
}