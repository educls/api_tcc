
const constants = require('../utils/constants');
const Database = require('../data/database');

const db = new Database();

exports.cadastraMedico = async (medico) => {
    const { Nome, CPF, Senha, CRM, Especialidade } = medico;

    if (Senha === '' || CPF === '' || CRM === ''){
        throw new Error(constants.SOME_FIELDS_NULL);
    }

    await db.connect();
    const result = await db.query(constants.SQL_INSERT_MEDICO, [Nome, CPF, Senha, CRM, Especialidade])
    db.close()
    console.log(result)

    if(result.affectedRows > 0){
        return true
    }else {
        return false
    }
}

exports.listaMedico = async (id) => {
    await db.connect();

    const [rows] = await db.query(constants.SQL_SELECT_ID_MEDICO, [id])
    await db.close();

    return rows
}

exports.deletaMedico = async (id) => {
    await db.connect();

    const rows = await db.query(constants.SQL_DELETE_PHYSICIAN, [id])
    await db.close();

    return rows
}